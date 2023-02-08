module.exports.cancel = function (req, response, next){ 

vonage.verify.control({
    request_id: req.request_id,
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