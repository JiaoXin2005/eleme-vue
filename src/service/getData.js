import axios from 'axios'
// const setPromise = data => {
//     new Promise((resolve,reject) => {
//         resolve(data);
//     })
// }

var sellerData = () => axios.get('/api/seller').then((res) => Promise.resolve(res.data));
var goodsData = () => axios.get('/api/goods').then((res) => Promise.resolve(res.data));
var ratingsData = () => axios.get('/api/ratings').then((res) => Promise.resolve(res.data));

export {sellerData,goodsData,ratingsData};
