module.exports = (app, passport) => {
    app.post('/user/signin', passport.authenticate('local-signin', {
        successRedirect : '/profile',
        failureRedirect : '/profile',
        failureFlash : true
    }))

    app.post('/user/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/profile',
        failureFlash : true
    }))

    app.get('/user/signout', (req, res) => {
        req.logout()
        return res.send('successful logout')
    })
}