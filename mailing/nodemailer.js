var nodemailer = require('nodemailer');
var mailing = (data,email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'AdminEmail',
          pass: 'Password'
        }
      });
     
      
      var mailOptions = {
        from: 'vinod',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `${data}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports ={mailing};