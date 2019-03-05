let studentModel = require('./models/student')
let teacherModel = require('./models/teacher')
let attendanceModel = require('./models/attendance')
const FUNCTIONS = require('../functions')

let sockets = []
io.on('connection', (socket) => {
    console.log(socket.id)
    sockets.push(socket.id)
    // socket.emit('qr_code', 'rand')
    

    openRoutes.post('/qr_attendance', (req, res) => {
        try{
            let params = req.body;
            let timestamp = new Date()/1000;
            let token = randomKey(12)

            attendanceModel.find({token: token})
            .then(data => {
                if(data.length === 0){
                    let dataToAdd = {
                        student_id: params.student_id || "",
                        course_id: params.course_id || "",
                        timestamp: timestamp,
                        token: token,
                        manual: false
                    }

                    newAttendace = new attendanceModel(dataToAdd)
                    newAttendace.save()
                    .then(data2 => {
        
                        console.log(req.query.token)
                        sockets.forEach(element => {
                            io.to(element).emit('data', dataToAdd)
                            
                        });
                    
                        console.log('socket done')
                        res.send(FUNCTIONS.RESPONSE(100, data2))
                    })
                }
                else{
                    res.send(FUNCTIONS.RESPONSE(209, 'qr already used'))
                }
            })
        }
        catch(err){
            res.send(FUNCTIONS.RESPONSE(500, err.message))
        }

    });

})