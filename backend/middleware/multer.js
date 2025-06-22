import multer from "multer";
import path from "path"; // Import path to handle file extensions

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Save to 'uploads' folder
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
        }
    }),
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;

        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true); // Accept the file
        }

        // Reject the file if it's not of the allowed type
        return cb(new Error("Only .jpeg, .jpg, or .png files are allowed."));
    }
});

export default upload;
