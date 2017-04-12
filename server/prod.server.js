var express = require('express');
var port = process.env.PORT || 80;

var app = express();

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


app.listen(port,function(err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
})
