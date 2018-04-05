const mongoose = require('mongoose')

const fileInfoSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    location: String,
    city: String,
    country: String,
    date: Date,
    privacy: String,
    file: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date
})

const FileInfo = mongoose.model('FileInfo', fileInfoSchema)
module.exports = FileInfo