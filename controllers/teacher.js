const Teacher = require('../models/teacher')
const FUNCTIONS = require('../functions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'attendance_portal'

function addTeacher(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000;
        bcrypt.hash(params.password || "", saltRounds, function(err, hash) {
            const newTeacher = new Teacher({
                roll_number: params.roll_number || "",
                field: params.field || "",
                year: params.year || "",
                name: params.name || "",
                phone: params.phone || "",
                email: params.email || "",
                password: hash,
                added_timestamp: timestamp,
                updated_timestamp: timestamp
            })

            newTeacher.save()
            .then((data) => {
                console.log(data)
                res.send(FUNCTIONS.RESPONSE(100, data))
            }).catch(err => {
                res.send(FUNCTIONS.RESPONSE(500, err.message))
            })
            if(err)
                res.send(FUNCTIONS.RESPONSE(500, err.message))
        });
    }
    catch(err){
        res.send(FUNCTIONS.RESPONSE(500, err.message))
    }
}

function getTeachers(req, res){
    try{
        Teacher.find({})
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

function updateTeacher(req, res){
    try{
        let params = req.body
        let timestamp = new Date()/1000
        params.updated_timestamp = timestamp
        Teacher.findOneAndUpdate({_id: params.teacher_id}, params, {
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

function deleteTeacher(req, res){
    try{
        let params = req.body
        Teacher.deleteOne({_id: params.teacher_id})
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

function teacher_login(req, res){
    try{
        let params = req.body
        Teacher.findOne({phone: params.phone})
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
                res.send(FUNCTIONS.RESPONSE(201, 'teacher not found'))

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
    addTeacher, getTeachers, updateTeacher, deleteTeacher, teacher_login
    // AddBanner, getAllBanners, updateBanners, deleteBanners
}