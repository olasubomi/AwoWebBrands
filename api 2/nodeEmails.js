var nodemailer = require('nodemailer');

module.exports.sendEmails = function (req, res, next){ 
  console.log("To test page");

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iamsubomi@gmail.com',
      pass: 'yfrpadanypdgtmae'
    }
  });
  
  var mailOptions = {
    from: 'iamsubomi@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.sendStatus(200);
};

