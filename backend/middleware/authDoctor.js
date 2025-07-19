import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized. Please login again.'
            });
        }

        // Verify token
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

        // Attach doctor ID to request body
        req.body.docId = decoded.id;

        next();

    } catch (error) {
        console.error("Doctor Auth Error:", error.message);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please login again.'
        });
    }
};

export default authDoctor;
