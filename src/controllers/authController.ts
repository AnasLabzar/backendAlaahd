import express from 'express';
import bcrypt from 'bcrypt';
import { random, authentication } from '../helper';
import { User, IUser } from '../models/User';
import { Log } from '../models/Log';
import { Notification } from '../models/Notification';
import { sendEmail } from '../helper/email';
import mongoose from 'mongoose';

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select('+authentication.password +authentication.salt');
    if (!user || !user.authentication?.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.authentication.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const sessionToken = authentication(random(), user._id.toString());
    user.authentication.sessionToken = sessionToken;
    await user.save();

    // Log the login action
    await Log.create({
      action: "LOGIN",
      performedBy: user._id,
      details: { email },
    });

    // Notify the user of successful login
    await Notification.create({
      userId: user._id,
      title: "Login Successful",
      message: `Welcome back, ${user.username}! You successfully logged in.`,
      type: "success",
    });

    res.cookie('ANAS-AUTH', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, role, SalesZone, score, phone } = req.body;

    // Validation
    if (!username || !email || !role || !score || !phone) {
      await session.abortTransaction();
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate credentials
    const generatedPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(generatedPassword, salt);
    const sessionToken = authentication(random(), username);

    const user: IUser = new User({
      username,
      email,
      authentication: {
        password: hashedPassword,
        salt,
        sessionToken,
      },
      role,
      score,
      SalesZone: SalesZone || null,
      phone,
      fetchedAt: new Date(),
    });

    await user.save({ session });

    try {
      // Send credentials email
      const emailBody = `
        Welcome to ComeInUp!
        
        Your account has been created:
        Email: ${email}
        Password: ${generatedPassword}
        
        Please login at: http://comeinup.com/
        Change your password after first login.
        
        This is an automated message - please do not reply
      `;
      await sendEmail({
        to: email,
        subject: 'Your ComeInUp Account Credentials',
        body: emailBody,
      });
    } catch (emailError) {
      await session.abortTransaction();
      console.error("Email failed to send:", emailError);
      return res.status(500).json({
        message: "User created but email failed to send",
        manualActionRequired: true,
        email: email,
        generatedPassword: generatedPassword,
      });
    }

    await session.commitTransaction();

    // Log the registration action
    await Log.create({
      action: "REGISTER",
      performedBy: user._id,
      details: { email, username, role },
    });

    // Notify the admin of a new user registration
    const admins = await User.find({ role: "SuperAdmin" });
    for (const admin of admins) {
      await Notification.create({
        userId: admin._id,
        title: "New User Registered",
        message: `${username} has registered with the role ${role}.`,
        type: "info",
      });
    }

    const userResponse = {
      username: user.username,
      email: user.email,
      role: user.role,
      score: user.score,
      phone: user.phone,
    };

    return res.status(201).json(userResponse);
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
};
