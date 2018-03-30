module.exports = (app, passport) => {

    isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.send("not logged in")
        }
    }

    app.get('/profile', isLoggedIn, (req, res) => {
        return res.send('successful login')
    })

    require('./user')(app, passport)

}