import jwt from 'jsonwebtoken'

// Doctor authentication middleware
// const authDoctor = async (req, res, next) => {
//     const { dtoken } = req.headers;
//     if (!dtoken) {
//         return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
//     }
//     try {
//         const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
//         req.doctor = { id: token_decode.id }; // Attach doctor ID to request object
//         next();
//     } catch (error) {
//         console.error('Error in authDoctor:', error);
//         res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };

// export default authDoctor;

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    const { dtoken } = req.headers
    if (!dtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = token_decode.id
        next();
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

export default authDoctor;