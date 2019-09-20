const ajax = require('./ajax');

const getUrl = 'http://localhost:5050/api/transactions';
const postUrl = 'http://localhost:5050/api/transactions';

const transactionService = {
  getAll: async () => {
    try {
      const url = getUrl;
      const resp = await ajax.get(url);
      console.log('>>>', resp);
      return resp;
    } catch (error) {
      console.log('error getting tran: ', error);
      throw error;
    }
  },

  postTransaction: async (data) => {
    try {
      const url = postUrl;
      const resp = await ajax.post(url, data);
      return resp;
    } catch (error) {
      console.log('error posting data: ', error);
      throw error;
    }
  },

  postArrayOfTransactions: async (data) => {
    try {
      const url = postUrl;
      // to use .all, need array of functions that call api
      let axiosReqArray = [];
      data.forEach((t) => {
        let newPromise = ajax.post(url, t);
        axiosReqArray.push(newPromise);
      });

      // resolve each requests individually
      // response are in array for each..
      // return a new array of new promise
      const resp = await Promise.all(axiosReqArray);
      return resp;
      // Promise.all(axiosReqArray)
      // .then((values) => {
      //   console.log('--->', values);
      //   values.forEach((result) => {
      //     console.log('-->>', result.status, '-->>', result.data);
      //   });
      // });
    } catch (error) {
      console.log('error posting array of data: ', error);
      throw error;
    }
  }

}

module.exports = transactionService;
