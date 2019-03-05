const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name: String,
    added_timestamp: String,
    update_timestamp: String
}, {
    versionKey: false
});

module.exports = mongoose.model('course', courseSchema);