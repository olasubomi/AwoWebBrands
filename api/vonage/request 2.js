module.exports.request = function (req, response, next){ 
  const Vonage = require('@vonage/server-sdk');
  const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET
  });
  
console.log("Comes in request file: " + req.body);
let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        res.end('ok');
    });
    
vonage.verify.request({
  number: req.body.number,
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