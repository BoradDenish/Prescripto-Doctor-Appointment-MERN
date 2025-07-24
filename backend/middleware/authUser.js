import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers

        if (!token) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login again.'
            });
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        // Attach user ID to request body
        req.body.userId = token_decode.id

        next()

    } catch (error) {
        console.error("User Auth Error:", error.message);
        res.json({
            success: false,
            message: 'Invalid or expired token. Please login again.'
        });
    }
}

export default authUser;