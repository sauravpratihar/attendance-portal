const Attendance = require('../models/attendance')
const FUNCTIONS = require('../functions')


function addAttendance(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000;

        const newAttendance = new Attendance({
            student_id: params.student_id || "",
            course_id: params.course_id || "",
            timestamp: timestamp,
            token: params.token || "",
            manual: JSON.parse(params.manual || "false")
        })

        newAttendance.save()
        .then((data) => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function getAttendances(req, res){
    try{
        Attendance.find({})
        .then(data => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function updateAttendace(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000
        params.updated_timestamp = timestamp
        if(params.manual) {
            params.manual = JSON.parse(params.manual)
        }
        Attendance.findOneAndUpdate({_id: params.attendance_id}, params, {
            new: true
        })
        .then(data => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))

        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function deleteAttendance(req, res){
    try{
        let params = req.body
        Attendance.deleteOne({_id: params.attendance_id})
        .then(data => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))

        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function getAttendancesByStudentId(req, res){
    try{
        let params = req.query
        Attendance.find({student_id: params.student_id})
        .then(data => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function getAttendancesByCourseId(req, res){
    try{
        let params = req.query
        Attendance.find({student_id: params.course_id})
        .then(data => {
            console.log(data)
            res.send(FUNCTIONS.RESPONSE(100, data))
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

module.exports = {
    addAttendance, getAttendances, updateAttendace, deleteAttendance, getAttendancesByStudentId, getAttendancesByCourseId
    // addCourse, getCourses, updateCourse, deleteCourse
    // addTeacher, getTeachers, updateTeacher, deleteTeacher
    // AddBanner, getAllBanners, updateBanners, deleteBanners
}