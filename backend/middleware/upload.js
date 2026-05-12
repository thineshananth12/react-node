const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'uploads/');
    },
     filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1E9);

        const extension =
            path.extname(file.originalname);

        const finalName =
            uniqueName + extension;

        cb(null, finalName);

    }
});
const fileFilter = (req, file, cb) => {
    const allowed =
        /jpg|jpeg|png|webp/;
    const isValid = allowed.test(path.extname(file.originalname));
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Only image files alloweds'));
    }
}

const upload = multer({

    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;