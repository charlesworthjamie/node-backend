const Profile = require('../models/Profile')

module.exports = (app, passport) => {

    app.get('/profile', isLoggedIn, (req, res) => {
        return res.send('successful login')
    })

    app.post('/profile/update', isLoggedIn, (req, res, next) => {
        Profile.findOne({
            'createdBy': req.user._id
        }, (err, existingUser) => {

            let profile = {}

            if (existingUser) {
                profile = existingUser
            } else {
                profile = new Profile()
                profile.createdAt = Date.now()
                profile.createdBy = req.user._id
            }

            profile.firstName = req.body.firstName
            profile.lastName = req.body.lastName
            profile.dateOfBirth = new Date(req.body.dateOfBirth)
            profile.updatedAt = Date.now()

            profile.save((err) => {
                if (err) {
                    return next(err)
                } else {
                    return res.send("Profile updated")
                }
            })
        })
        
    })
    
}