module.exports.verify = function (req, response, next){ 
  const Vonage = require('@vonage/server-sdk');

  const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET
  });
  console.log("Comes in verify file: ");
  
  // console.log(req.body);
  // console.log(req.body.request_id.result.request_id);

vonage.verify.check({
    request_id: req.body.request_id.result.request_id,
    code: req.body.pin
  }, (err, result) => {
    if (err) {
      console.error(err);
      return response.status(500).send(err);
    } else {
      console.log(result);
      return response.status(200).send(JSON.stringify({result}));
    }
  });

}