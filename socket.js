const Student = require('./models/student')
const Teacher = require('./models/teacher')
// console.log(token)
let token = randomKey(8);

io.on('connection', (socket) => {
    io.emit('qr_code',  token)
});




// io.on('connection', (socket) => {
//     // io.path('/testq')

//     socket.send('saurav')
//     console.log('user connected')
//     io.emit('qr_code',  token)

//     socket.on('join', function(userNickname) {
//         console.log(userNickname +" : has joined the chat "  );
//         socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
//     });

//     socket.on('open', function() {
//         console.log('open');
//         socket.send(Date.now());
//         // socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
//     });


//     socket.on('qr_code', (data) => {
//        console.log(data)
//     }   )
        
//     //    io.emit('messagedetection', senderNickname, messageContent )
//     //     })
    
//     socket.on('disconnect', function() {
//         console.log(' has left ')
//         socket.broadcast.emit( "userdisconnect" ,' user has left')
//     })
// })
