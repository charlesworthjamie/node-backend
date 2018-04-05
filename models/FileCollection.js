const mongoose = require('mongoose')

const fileCollectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    category: String,
    privacy: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date
})

const FileCollection = mongoose.model('FileCollection', fileCollectionSchema)
module.exports = FileCollection