const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    student_id: String,
    course_id: String,
    timestamp: String,
    token: String,
    manual: Boolean
}, {
    versionKey: false
});

module.exports = mongoose.model('attendance', attendanceSchema);