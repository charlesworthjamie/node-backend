const FileCollection = require('../models/FileCollection')

module.exports = (app, passport) => {

    app.post('/file-collection/create', isLoggedIn, (req, res, next) => {

        fileCollection = new FileCollection()
        fileCollection.createdAt = Date.now()
        fileCollection.createdBy = req.user._id

        fileCollection.title = req.body.title
        fileCollection.description = req.body.description
        fileCollection.updatedAt = Date.now()

        fileCollection.save((err) => {
            if (err) {
                return next(err)
            }
                
            return res.send("FileCollection created")
        })
        
    })

    app.put('/file-collection/update', isLoggedIn, (req, res, next) => {
        FileCollection.findOne({
            '_id': req.body.fileCollectionId,
            'createdBy': req.user._id
        }, (err, fileCollection) => {
            if (err) {
                return next(err)
            }

            fileCollection.title = req.body.title
            fileCollection.description = req.body.description
            fileCollection.updatedAt = Date.now()

            fileCollection.save((err) => {
                if (err) {
                    return next(err)
                }
                
                return res.send("fileCollection updated")
            })
        })
    })

    app.delete('/file-collection/delete', isLoggedIn, (req, res, next) => {
        FileCollection.deleteOne({
            '_id': req.body.fileCollectionId,
            'createdBy': req.user._id
        }, (err) => {
            if (err) {
                return next(err)
            }
            
            return res.send('deleted')
        })
    })
    
    app.get('/file-collection/list', isLoggedIn, (req, res, next) => {
        FileCollection.where('createdBy', req.user._id).exec((err, fileCollections) => {
            return res.send(fileCollections)
        })
    })
}