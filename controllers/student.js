const Student = require('../models/student')
const FUNCTIONS = require('../functions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'attendance_portal'


function addStudent(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000;

        const newStudent = new Student({
            name: params.name || "",
            roll_number: params.roll_number || "",
            field: params.field || "",
            year: params.year || "",
            email: params.email || "",
            phone: params.phone || "",
            imei: params.imei || "",
            device_details: JSON.parse(params.device_details || "{}"),
            added_timestamp: timestamp,
            updated_timestamp: timestamp
        })

        newStudent.save()
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

function getStudents(req, res){
    try{
        Student.find({})
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

function updateStudent(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000
        params.updated_timestamp = timestamp
        if(params.device_details){
            params.device_details = JSON.parse(params.device_details)
        }
        Student.findOneAndUpdate({_id: params.student_id}, params, {
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

function deleteStudent(req, res){
    try{
        let params = req.body
        Student.deleteOne({_id: params.student_id})
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

function getStudentsByFieldYear(req, res){
    try{
        let params = req.query
        Student.find({ field: params.field, year: params.year })
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

function student_login(req, res){
    try{
        let params = req.body
        Student.findOne({phone: params.phone})
        .then(data => {
            if(data){
                bcrypt.compare(params.password || "", data.password, function(err, resp) {
                    if(resp){
                        let token = jwt.sign({check:  true}, JWT_SECRET, {
                            expiresIn: '2h' // expires in 24 hours
                        });
                        data.token = token
                        res.send({
                            message: data,
                            token: token, 
                            response_code: 100
                        })
                    }else{
                        res.send(FUNCTIONS.RESPONSE(203, 'Wrong Password'))
                    }
                })
            }
            else{
                res.send(FUNCTIONS.RESPONSE(205, 'wrong email'))

            }
        }).catch(err => {
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        })
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

module.exports = {
    addStudent, getStudents, updateStudent, deleteStudent, getStudentsByFieldYear, student_login
}