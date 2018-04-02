module.exports = (app, passport) => {
    app.post('/user/signin', passport.authenticate('local-signin', {
        successRedirect : '/profile',
        failureRedirect : '/signin',
        failureFlash : true
    }))

    app.post('/user/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }))

    app.get('/user/signout', (req, res) => {
        req.logout()
        return res.send('successful logout')
    })
}