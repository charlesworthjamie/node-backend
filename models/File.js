const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    originalName: String,
    url: String,
    type: String,
    fileCollection: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date
})

const File = mongoose.model('File', fileSchema)
module.exports = File