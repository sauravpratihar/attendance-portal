const express = require('express')
const app = express()
const morgon = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken')

http = require('http'),
server = http.createServer(app),
io = require('socket.io').listen(server);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(morgon('dev'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit: 10000000 }))
mongoose.connect('mongodb://127.0.0.1:27017/attendance_portal', {useNewUrlParser: true})
  .catch(err => console.error(err))

server.listen(3000, '0.0.0.0');

app.listen(2999, '0.0.0.0', function(){
  console.log('Server started on port 2999')
})

// const JWT_SECRET = 'mkjewellers_jwt_secret'
const { checkParamsPOST, checkParamsGET, randomKey } = require('./functions')

//Import Controllers
const teacherController = require('./controllers/teacher')
const courseController = require('./controllers/course')
const attendanceController = require('./controllers/attendance')
const studentController = require('./controllers/student')

const openRoutes = express.Router();
const protectedRoutes = express.Router();
app.use('/v1', openRoutes)
app.use('/v1', protectedRoutes)

protectedRoutes.use((req, res, next) =>{
  // check header for the token
  var token = req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, JWT_SECRET, (err, decoded) =>{      
      if (err) {
        return res.json({ 
          message: 'invalid token',
          response_code: 403 
        });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token  
    res.send({
      message: 'no token provided',
      response_code: 402
    });
  }
});

fs = require('fs'),
openRoutes.get('/', function(req, res){
    index = fs.readFileSync(__dirname + '/test.html');
    res.end(index);
})

// Teachers
openRoutes.post('/add_teacher', checkParamsPOST(['year', 'field', 'name', 'phone', 'email', 'password']), teacherController.addTeacher);
openRoutes.post('/update_teacher', checkParamsPOST(['teacher_id']), teacherController.updateTeacher);
openRoutes.post('/delete_teacher', checkParamsPOST(['teacher_id']), teacherController.deleteTeacher);
openRoutes.get('/get_teachers', teacherController.getTeachers);
openRoutes.post('/teacher_login', checkParamsPOST(['phone', 'password']), teacherController.teacher_login);

// Course
openRoutes.post('/add_course', checkParamsPOST(['name']), courseController.addCourse);
openRoutes.post('/update_course', checkParamsPOST(['course_id']), courseController.updateCourse);
openRoutes.post('/delete_course', checkParamsPOST(['course_id']), courseController.deleteCourse);
openRoutes.get('/get_courses', courseController.getCourses);

// Attendance
openRoutes.post('/add_attendance', checkParamsPOST(['student_id', 'course_id', 'token', 'manual']), attendanceController.addAttendance);
openRoutes.post('/update_attendance', checkParamsPOST(['attendance_id']), attendanceController.updateAttendace);
openRoutes.post('/delete_attendance', checkParamsPOST(['attendance_id']), attendanceController.deleteAttendance);
openRoutes.get('/get_attendances', attendanceController.getAttendances);
openRoutes.get('/get_attendances_by_student_id', checkParamsGET(['student_id']), attendanceController.getAttendancesByStudentId);
openRoutes.get('/get_attendances_by_course_id', checkParamsGET(['course_id']), attendanceController.getAttendancesByCourseId);

// Student
openRoutes.post('/add_student', checkParamsPOST(['name', 'roll_number', 'field', 'year', 'email', 'phone', 'imei', 'device_details']), studentController.addStudent);
openRoutes.post('/update_student', checkParamsPOST(['student_id']), studentController.updateStudent);
openRoutes.post('/delete_student', checkParamsPOST(['student_id']), studentController.deleteStudent);
openRoutes.get('/get_students', studentController.getStudents);
openRoutes.get('/get_students_by_field_year', checkParamsGET(['field', 'year']), studentController.getStudentsByFieldYear);
openRoutes.post('/student_login', checkParamsPOST(['phone', 'password']), studentController.student_login);

//random key generator


// let socket_file = require('./socket')
// socket_file(io)

//socket.io
