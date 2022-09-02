const multer = require('multer')

const storage = multer.diskStorage({
    destination: './src/media/uploads',
    filename: (req, file, cb) => {
        const newName = `${Date.now()}_${file.originalname.toLowerCase().split(' ').join('-')}`
        cb(null, newName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // console.log(file.mimetype.startsWith("image"))
        if (!file.mimetype.startsWith("image")) {
            cb(null, false)
        } else {
            cb(null, true)
        }
    }
}).single("image")

module.exports = upload