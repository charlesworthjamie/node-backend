const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

module.exports = (passport) => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if (email) {
            email = email.toLowerCase()
        }

        process.nextTick(() => {
            User.findOne({
                'local.email': email
            }, (err, user) => {
                if (err) {
                    return done(err)
                }
                
                if (!user || !user.validPassword(password)) {
                    return done(null, false, req.flash('signInMessage', 'Invalid credentials.'))
                } else {
                    return done(null, user)
                }
            })
        })
    }))

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if (email) {
            email = email.toLowerCase()
        }

        process.nextTick(() => {
            if (!req.user) {
                User.findOne({
                    'local.email': email
                }, (err, existingUser) => {
                    if (err) {
                        return done(err)
                    }

                    if (existingUser) {
                        return done(null, false, req.flash('signUpMessage', 'That email address is taken.'))
                    } else {
                        let newUser = new User()

                        newUser.createdAt = Date.now()
                        newUser.updatedAt = Date.now()
                        newUser.local.email = email
                        newUser.local.password = newUser.generateHash(password)

                        newUser.save((err) => {
                            if (err) {
                                return done(err)
                            } else {
                                return done(null, newUser)
                            }
                        })
                    }
                })
            } else {
                return done(null, req.user)
            }
        })
    }))
}