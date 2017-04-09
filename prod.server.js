var express = require('express');
var port = process.env.PORT || 9000;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next) {
    req.url = 'index.html';
    next();
})

app.use(router);

var appData = require('./data.json')
var seller = appData.seller;
var goods  =appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

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

app.use(express.static('./dist'));

module.exports = app.listen(port,function(err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
})
