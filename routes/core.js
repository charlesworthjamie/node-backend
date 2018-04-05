module.exports = (app, passport) => {

    isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.send("not logged in")
        }
    }

    require('./user')(app, passport)
    require('./profile')(app, passport)
    require('./fileCollection')(app, passport)
    require('./file')(app, passport)

}