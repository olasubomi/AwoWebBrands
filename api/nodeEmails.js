var nodemailer = require('nodemailer');

module.exports.sendAdminEmail = function (req, res, next){ 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iamsubomi@gmail.com',
      pass: 'yfrpadanypdgtmae'
    }
  });
  
  console.log("Gets in node mailer");
  // console.log(req.body);
  var mailOptions = {
    from: 'iamsubomi@gmail.com',
    to: 'iamsubomi@gmail.com',
    subject: req.body.adminEmailSubjectTitle,
    text: req.body.adminEmailContent
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  next()

  res.sendStatus(200);
};

module.exports.sendCustomerEmail = function (req, res, next){ 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iamsubomi@gmail.com',
      pass: 'yfrpadanypdgtmae'
    }
  });
  
  console.log("Gets in node mailer");
  // console.log(req.body);
  var mailOptions = {
    from: 'iamsubomi@gmail.com',
    to: req.body.to,
    subject: req.body.customerEmailSubjectTitle,
    text: req.body.customerEmailContent
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

};


