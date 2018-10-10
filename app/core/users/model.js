
const uuid = require('node-uuid');
class User {
    async formatUserData(data) {
      return {
            id: uuid.v4(),
            username: data.username,
            password: data.password,
            hash: null,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            createdDate: new Date(),
        };

    }

}

module.exports = new User();