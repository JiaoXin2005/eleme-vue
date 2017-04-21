var express = require('express');
var fs = require('fs');
var https = require('https');
var port = process.env.PORT || 443;

var privateKey = fs.readFileSync('./private.pem', 'utf-8');
var certificate = fs.readFileSync('./file', 'utf-8');
var credentials = {key: privateKey, cert: certificate};

var app = express();
var httpsServer = https.createServer(credentials,app);

var appData = require('./data.json')
var seller = appData.seller;
var goods  =appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

app.use(function (req, res, next) {

  var orgin = /localhost/.test(req.get('origin')) ? 'http://localhost:8090' : 'https://jiaoxin2005.github.io';
  res.set({
    'access-control-allow-origin': orgin,
  })
  next()
})

apiRoutes.get('/api/seller',function(req,res) {
  res.json({
    errorno: 0,
    data: seller
  })
});

apiRoutes.get('/api/goods',function(req,res) {
  res.json({
    errorno: 0,
    data: goods
  })
});

apiRoutes.get('/api/ratings',function(req,res) {
  res.json({
    errorno: 0,
    data: ratings
  })
});
app.use(apiRoutes);


httpsServer.listen(port,function(err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
})
