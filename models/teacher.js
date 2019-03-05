const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    field: String,
    year: String,
    name: String,
    phone: String,
    email: String,
    password: String,
    added_timestamp: String,
    updated_timestamp: String
}, {
    versionKey: false
});

module.exports = mongoose.model('teacher', teacherSchema);