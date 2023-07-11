module.exports.request = function (req, response, next){ 
console.log("Comes in request file");
vonage.verify.request({
  number: req.number,
  brand: "Awo Web Brands"
}, (err, result) => {
  if (err) {
    console.error(err);
    return response.status(500).send(err);
  } else {
    const verifyRequestId = result.request_id;
    console.log('request_id', verifyRequestId);
    return response.status(200).send(JSON.stringify({result}));
  }
});

}