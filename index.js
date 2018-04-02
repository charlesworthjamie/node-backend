const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')

const errorHandler = require('errorhandler')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const databaseConfig = require('./config/database')
mongoose.connect(databaseConfig.url)

require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: "super-secret",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./routes/routes')(app, passport)

app.use(errorHandler())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})