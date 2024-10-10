"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// Plain text password for testing
const plainPassword = 'easycafe';
// Hash the password manually
bcrypt_1.default.hash(plainPassword, 10, (err, hash) => {
    if (err)
        throw err;
    console.log('Manually hashed password:', hash);
    // Compare the manually hashed password with the one in the database
    const hashedPasswordFromDB = '$2b$10$vE7vKF.2pSmvIDTLix0.MOyhjGssnv/vxssD0sR/31MJHTtuMfydK'; // Replace with your DB hash
    bcrypt_1.default.compare(plainPassword, hashedPasswordFromDB, (err, result) => {
        if (err)
            throw err;
        console.log('Password match:', result); // Should log true if it matches
    });
});
//# sourceMappingURL=testPasswordHash.js.map