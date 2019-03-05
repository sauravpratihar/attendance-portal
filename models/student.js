const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: String,
    roll_number: String,
    field: String,
    year: String,
    email: String,
    phone: String,
    password: String,
    imei: String,
    device_details: Object,
    added_timestamp: String,
    updated_timestamp: String
}, {
    versionKey: false
});

module.exports = mongoose.model('student', studentSchema);