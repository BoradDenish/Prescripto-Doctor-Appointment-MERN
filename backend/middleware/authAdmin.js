import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login again2222222.'
            });
        }

        // Verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check if the email in token matches the admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: 'Forbidden. Invalid Admin.'
            });
        }

        // Token is valid
        req.admin = decoded; // optional: attach to request
        next();

    } catch (error) {
        console.error("Admin Auth Error:", error.message);
        res.json({
            success: 2,
            message: 'Invalid or expired token. Please login again.'
        });
    }
};

export default authAdmin;
