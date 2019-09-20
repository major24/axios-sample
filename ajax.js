const axios = require('axios').default

const ajax = {
  get: async function (url) {
    const resp = await axios.get(url)
    return resp
  },
  post: function (url, data) {
    const resp = axios.post(url, data)
    return resp
  }
}

module.exports = ajax;
