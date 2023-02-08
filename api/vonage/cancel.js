module.exports.cancel = function (req, response, next){ 
  const Vonage = require('@vonage/server-sdk');

  const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET
  });
  
vonage.verify.control({
    request_id: req.body.request_id,
    cmd: 'cancel'
  }, (err, result) => {
    if (err) {
      console.error(err);
      return response.status(500).send(err);
    } else {
      console.log(result);
      return response.status(200).send(result);
    }
  });
}