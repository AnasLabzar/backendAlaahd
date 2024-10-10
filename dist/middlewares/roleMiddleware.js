"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
// Middleware to check for user roles
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const user = req.user; // Now TypeScript knows `user` exists on `req`
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=roleMiddleware.js.map