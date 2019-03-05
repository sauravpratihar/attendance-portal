const Course = require('../models/course')
const FUNCTIONS = require('../functions')


function addCourse(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000;

        const newCourse = new Course({
            name: params.name || "",
            added_timestamp: timestamp,
            update_timestamp: timestamp
        })

        newCourse.save()
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

function getCourses(req, res){
    try{
        Course.find({})
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

function updateCourse(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000
        params.updated_timestamp = timestamp
        Course.findOneAndUpdate({_id: params.course_id}, params, {
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

function deleteCourse(req, res){
    try{
        let params = req.body
        Course.deleteOne({_id: params.teacher_id})
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
    addCourse, getCourses, updateCourse, deleteCourse
    // addTeacher, getTeachers, updateTeacher, deleteTeacher
    // AddBanner, getAllBanners, updateBanners, deleteBanners
}