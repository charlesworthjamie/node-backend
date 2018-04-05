const File = require('../models/File')
const multer = require('multer')
const uploadDestination = './uploads/'

const uploadFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

const uploadSettings = {
    dest: uploadDestination,
    fileFilter: uploadFilter
}

const upload = multer(uploadSettings)

module.exports = (app, passport) => {

    app.post('/file/upload', isLoggedIn, upload.single('file-upload'), (req, res, next) => {

        const file = new File

        file.originalName = req.file.originalname
        file.url = req.file.path
        file.createdBy = req.user._id
        file.createdAt = Date.now()
        file.updatedAt = Date.now()

        file.save((err) => {
            if (err) {
                return next(err)
            } else {
                res.send('uploaded')
            }
        })
        
    })


}