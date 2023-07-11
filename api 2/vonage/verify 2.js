module.exports.verify = function (req, response, next){ 

vonage.verify.check({
    request_id: req.request_id,
    code: req.pin
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