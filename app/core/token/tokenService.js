const config = require('../../config');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {  createToken, retrieveTokens, revokeToken} = require('../../utils/token');
const TokenModel = require('./model');

class TokenService {
       async create(userData) {
        try {
            const token = await TokenModel.formatTokenData(userData);
            // generate random string
            if (token.id) {
                token.key_name = randomstring.generate({
                    length: 12,
                    charset: 'alphabetic'
                  });
            }

            // save user
            return await createToken(token);

        } catch (error) {
            const message = `error inside create token ${error.message}`
            throw new Error(message);
        }

    }

    async validate(inputToken) {
        try {
            // get all token
            const tokens =  await retrieveTokens();
            const matchingToken = tokens.find(token => token.key_name === inputToken);
        return !!matchingToken;
        } catch (error) {
            const message = `error inside validate token ${error.message}`
            throw new Error(message);
        }

    }

    async revoke(status, id) {
        try {
           return await revokeToken(status, id);
        } catch (error) {
            const message = `error inside revoke token ${error.message}`
            throw new Error(message);
        }

    }

    async all() {
        try {
            // get all token
           return await retrieveTokens();
        } catch (error) {
            const message = `error inside retrieveTokens token ${error.message}`
            throw new Error(message);
        }

    }
}
module.exports = new TokenService();


