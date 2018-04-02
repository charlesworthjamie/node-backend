const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date
})

const Folder = mongoose.model('Folder', folderSchema)
module.exports = Folder