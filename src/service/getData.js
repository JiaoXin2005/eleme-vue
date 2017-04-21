import axios from 'axios'

// axios.defaults.baseURL = 'http://jiaoxin2005.tk';
// var sellerData = () => axios.get('/api/seller').then((res) => Promise.resolve(res.data));
// var goodsData = () => axios.get('/api/goods').then((res) => Promise.resolve(res.data));
// var ratingsData = () => axios.get('/api/ratings').then((res) => Promise.resolve(res.data));

var sellerData = () => axios.get('./static/data.json').then((res) => Promise.resolve({data: res.data.seller, errorno: 0}));
var goodsData = () => axios.get('./static/data.json').then((res) => Promise.resolve({data: res.data.goods, errorno: 0}));
var ratingsData = () => axios.get('./static/data.json').then((res) => Promise.resolve({data: res.data.ratings, errorno: 0}));


export {sellerData,goodsData,ratingsData};
