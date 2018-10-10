const config = require('../../config');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { retrieveUsers, registerUser } = require('../../utils/userList');
const UserModel = require('./model');

class UserService {
    async authenticate(username, password) {
        try {
            const list = await retrieveUsers();
            const user = list.find(user => user.username === username);
            if (user && bcrypt.compareSync(password, user.hash)) {
                var signOptions = {
                    issuer:  'i',
                    subject:  's',
                    audience:  'a',
                    expiresIn:  "12h",
                    algorithm:  "HS384"
                   };
                const userWithoutHash = Object.assign({}, user, { hash: null });
                const token = jwt.sign({ data: user.username }, config.SECREATE, signOptions);
                return Object.assign({}, userWithoutHash, { token });
            }  else {
                throw new Error('User does not exist.');
            }
            
        } catch (error) {
            throw error;
        }
          
    }

    async create(userParam) {
        try {
            const userList = await retrieveUsers();
            // validate
            if (userList && userList.find(user => user.username === userParam.username)) {
                throw new Error('Username "' + userParam.username + '" is already taken');
            }

            const user = await UserModel.formatUserData(userParam);

            // hash password
            if (userParam.password) {
                user.hash = bcrypt.hashSync(userParam.password, 10);
            }

            // save user
            return await registerUser(user);

        } catch (error) {
            const message = `error inside create ${error.message}`
            throw new Error(message);
        }

    }
}
module.exports = new UserService();


