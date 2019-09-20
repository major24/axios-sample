const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send('Axios tester application. Use other urls to test');
});

app.get('/api/transactions', function (req, res) {
   console.log('in GET /api/transactions');
   const data = {
    trans: ['tran 1', 'tran 2', 'tran 3']
   };
   res.send(data);
});

app.post('/api/transactions', function (req, res) {
  var data = req.body;
  console.log('in api POST /api/transactions...', data);
  // throw 400 error on id missing
  if (!data.id) {
    console.log('>>>in api server. error id is missing');
    res.send({status: 400, error: 'ID is missing'});
  }
  let ts = Date.now();
  const result = { 'msg': 'from api-server-success-id: ' + data.id + ' --- ' + Math.floor(ts/1000)};
  res.send(result);
});


// USERS test for promise.all / axios.all
const usersDb = [
  {id: '24', firstName: 'Renold', lastName: 'Richardson'},
  {id: '25', firstName: 'Steve', lastName: 'Smith'}
];
const booksDb = [
  {id: 1000, userid: '24', title: 'Blue Heaven', publisher: 'Newyork Press'},
  {id: 1001, userid: '24', title: 'Angels are forever', publisher: 'LA Press'},
  {id: 2000, userid: '25', title: 'Kill Shot', publisher: 'Manhattan Press'},
]
app.get('/api/users/:id', function (req, res) {
  const id = req.params.id;
  console.log('in GET /api/users:/id  -- ' + id);
  const user = usersDb.filter(u => u.id === id);
  const data = {
    user: user
  };
  res.send(data);
});

app.get('/api/users/:id/books', function (req, res) {
  const id = req.params.id;
  console.log('in GET /api/users/:id/books -- ' + id);
  const books = booksDb.filter(b => b.userid === id);
  const data = {
    books: books
  };
  res.send(data);
});

const server = app.listen(5050, function () {
  console.log("Example app listening at http://localhost:5050");
});
