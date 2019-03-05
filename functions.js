// var constants = require('./constants')
// var request = require('request')
// var nodemailer = require('nodemailer')
// const bcrypt = require('bcrypt');

RESPONSE = (response_code, message) => {
    return {response_code, message}
}

checkParamsGET = (arr) => {
  return (req, res, next) => {
    var missing_params = []
    for (var i = 0; i < arr.length; i++) {
      if (!eval('req.query.' + arr[i])) {
        missing_params.push(arr[i])
      }
    }
    if (missing_params.length == 0) {
      next()
    } else {
      next(res.json({ response_code: 302, message: 'Parameter(s) missing: ' + missing_params.join(',') }))
    }
  }
}

checkParamsPOST = (arr) => {
  return (req, res, next) => {
    var missing_params = []
    for (var i = 0; i < arr.length; i++) {
      if (!eval('req.body.' + arr[i])) {
        missing_params.push(arr[i])
      }
    }
    if (missing_params.length == 0) {
      next()
    } else {
      next(res.json({ response_code: 302, message: 'Parameter(s) missing: ' + missing_params.join(',') }))
    }
  }
}


randomKey = (char) => {
  var text = ''
  var possible = 'ABCD0123456789EFGHIJKL0123456789MNOPQRS0123456789TUVWXYZabcdef0123456789ghijklmnopqr0123456789stuvwxyz0123456789'

  for (var i = 0; i < char; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}

// OTP = () => {
//   var text = ''
//   var possible = '1234567890987654321234567890'

//   for (var i = 0; i < 4; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
//   return text
// }

// sendSMS = (mobile, msg) => {
//   let link = 'http://api.msg91.com/api/sendhttp.php?sender=' + constants.OTP_SENDER + '&route=4&mobiles=' + mobile + '&authkey=' + constants.SMS_PROVIDER_AUTH_KEY + '&encrypt=0&country=91&message=' + msg + '&response=json'

//   request.get(link, function (err, res, body) {
//     if (err) {
//       return err
//     }
//     if (res.statusCode !== 200) {
//       return res
//     } else if (res.statusCode === 200) {
//       return res
//     }
//   })
// }

// sendMail = (to, subject, msg) => { // msg support html
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: constants.EMAIL_ID,
//       pass: constants.EMAIL_PASSWORD
//     }
//   })

//   const mailOptions = {
//     from: constants.EMAIL_ID, // sender address
//     to: to, // list of receivers
//     subject: subject, // Subject line
//     html: msg// plain text body
//   }

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) { console.log(err) } else { console.log(info) }
//     return true
//   })
// }

// shortURL = async (long_url) => {
//   var url = `http://tinyurl.com/api-create.php?url=${long_url}`
//   request.get(url, function (err, res, body) {
//     // console.log(res.body)
//     // return res
//     if (err) {
//       return err
//     } else {
//       return res.body
//     }
//   })
// }

// fcm_notification_customer = async (device_ids, message, callback) => {
//     request({
//       url: 'https://fcm.googleapis.com/fcm/send',
//       method: 'POST',
//       headers: {
//         'Content-Type' :' application/json',
//         'Authorization': `key=${constants.CUSTOMER_FCM_KEY}`
//       },
//       body: JSON.stringify(
//         { "data": {
//             "type": 'feature_type',
//             "message": message
//         },
//             "registration_ids" : device_ids,
//             "priority" : "high",
//         }
//       )
//     }, (error, response, body) => {
//       if (error) { 
//         // console.error(error, response, body); 
//         return false;
//       }
//       callback(response.body);  

//   });
// }

// fcm_notification_business = async (device_ids, message, callback) => {
//   request({
//     url: 'https://fcm.googleapis.com/fcm/send',
//     method: 'POST',
//     headers: {
//       'Content-Type' :' application/json',
//       'Authorization': `key=${constants.BUSINESS_FCM_KEY}`
//     },
//     body: JSON.stringify(
//       { "data": {
//           "type": 'feature_type',
//           "message": message
//       },
//           "registration_ids" : device_ids
//       }
//     )
//   }, (error, response, body) => {
//     if (error) { 
//       // console.error(error, response, body); 
//       return false;
//     }
//     console.log(response.body)
//     callback(response.body);  

// });
// }

// // generatePassword = async(password) => {
// //     const saltRounds = 10;
// //     return bcrypt.genSalt(saltRounds, function(err, salt) {
// //         return bcrypt.hash(password, salt, function(err, hash) {
// //           // Store hash in your password DB.
// //           console.log(hash)
// //           return hash;
// //         });
// //     });
// // }

// // checkPassword = async(password, hash) => {
// //     bcrypt.compare(password, hash, function(err, res) {
// //         // res == true
// //         console.log(res)
// //         return res;
// //     });
// // }

module.exports = {
  RESPONSE,
  randomKey,
  checkParamsGET,
  checkParamsPOST,
//   OTP,
//   sendSMS,
//   sendMail,
//   shortURL,
//   fcm_notification_customer,
//   fcm_notification_business,
  // generatePassword,
  // checkPassword
}
