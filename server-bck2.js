const express = require('express');
const app = express();
const axios = require('axios').default
// const transactionService = require('./transactionService');

app.get('/', function (req, res) {
   res.send('Axios tester application. Use other urls to test');
});

app.get('/api/transactions', function (req, res) {
   console.log('getting transactions...');
   axios.get('http://localhost:5050/api/transactions')
  .then(function (response) {
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.send(error);
  })
  .finally(function () {
    // always executed
  });
});

app.get('/api/transactions/post', function (req, res) {
  console.log('getting transactions...');
  axios.post('http://localhost:5050/api/transactions')
 .then(function (response) {
   console.log(response);
   res.send(response.data);
 })
 .catch(function (error) {
   console.log(error);
   res.send(error);
 })
 .finally(function () {
   // always executed
 });
});

const server = app.listen(4000, function () {
  console.log("Example app listening at http://localhost:4000");
});
