const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");

const transactionService = require('./transactionService');
const userBookService = require('./userBookService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/retrieve/transactions', function (req, res) {
  transactionService.getAll()
  .then((response) => {
    res.send(response.data);
  })
  .catch((error) => {
    res.send(error);
  });
});

router.post('/save/transactions', function(req,res) {
  var data = req.body.data;
  transactionService.postTransaction(data)
  .then((response) => {
    res.send(response.data);
  })
  .catch((error) => {
    res.send(error);
  });
});

router.post('/save/transactions/multiple', function(req, res) {
  var data = req.body.data;
  transactionService.postArrayOfTransactions(data)
  .then((response) => {
    let resultArray = [];
    response.forEach((result) => {
      console.log('--->>>', result.status + result.data);
      resultArray.push({'status': result.status, ' data': result.data });
    });
    res.send(resultArray)
  })
  .catch((error) => {
    res.send({'error': 'error processing the record'});
  })
});

// promise.all
router.get('/retrieve/users/:id/books', function(req, res) {
  const id = req.params.id;
  userBookService.getUserAndBooks(id)
  .then((response) => {
    response.forEach((r) => {
      console.log('at server: ', r.data);
    });
    let result = response[0].data.user[0];
    result.books = response[1].data.books;
    res.send(result);
  })
  .catch((error) => {
    res.send(error);
  });

});


//add the router
app.use('/', router);

const server = app.listen(4000, function () {
  console.log("Example app listening at http://localhost:4000");
});
