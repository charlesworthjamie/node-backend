const Folder = require('../models/Folder')

module.exports = (app, passport) => {

    app.post('/folder/create', isLoggedIn, (req, res, next) => {

        folder = new Folder()
        folder.createdAt = Date.now()
        folder.createdBy = req.user._id

        folder.name = req.body.name
        folder.updatedAt = Date.now()

        folder.save((err) => {
            if (err) {
                return next(err)
            }
                
            return res.send("Folder created")
        })
        
    })

    app.put('/folder/update', isLoggedIn, (req, res, next) => {
        Folder.findOne({
            '_id': req.body.folderId,
            'createdBy': req.user._id
        }, (err, folder) => {
            if (err) {
                return next(err)
            }

            folder.name = req.body.name
            folder.updatedAt = Date.now()

            folder.save((err) => {
                if (err) {
                    return next(err)
                }
                
                return res.send("folder updated")
            })
        })
    })

    app.delete('/folder/delete', isLoggedIn, (req, res, next) => {
        Folder.deleteOne({
            '_id': req.body.folderId,
            'createdBy': req.user._id
        }, (err) => {
            if (err) {
                return next(err)
            }
            
            return res.send('deleted')
        })
    })
    
    app.get('/folder/list', isLoggedIn, (req, res, next) => {
        Folder.where('createdBy', req.user._id).exec((err, folders) => {
            return res.send(folders)
        })
    })
}