const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile