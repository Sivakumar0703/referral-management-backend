import multer from "multer";

const storage = multer.memoryStorage();

// validate the uploaded file
const validateFile = (req,file,cb) => {
    if(file.mimetype === "application/pdf"){
        cb(null, true);
    } else {
        const error = new Error("Invalid file type. Only pdf is allowed");
        cb(error, false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter: validateFile
});

export default upload