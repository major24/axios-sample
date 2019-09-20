const ajax = require('./ajax');

const self = module.exports = {
  getUserById: async (id) => {
    try {
      const url = 'http://localhost:5050/api/users/' + id;
      const resp = await ajax.get(url);
      return resp;
    } catch (error) {
      console.log('error getting user by id: ', error);
      throw error;
    }
  },

  getBooksByUserId: async (id) => {
    try {
      const url = 'http://localhost:5050/api/users/'+id+'/books';
      const resp = await ajax.get(url);
      return resp;
    } catch (error) {
      console.log('error getting book by userid: ', error);
      throw error;
    }
  },

  getUserAndBooks: async (id) => {
    try {
      const resp = await Promise.all(
        [self.getUserById(id), self.getBooksByUserId(id)]
      );
      return resp;
    } catch (error) {
      console.log('error posting array of data: ', error);
      throw error;
    }
  }
}
