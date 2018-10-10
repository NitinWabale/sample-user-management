
const uuid = require('node-uuid');
class User {
    async formatTokenData(data) {
        const currentDate = new Date();
        const expectedCustomExpiryDate = new Date();
        expectedCustomExpiryDate.setDate(currentDate.getDate() + 7);
      return {
            id: uuid.v4(),
            creator: data.username,
            issuer_name: data.issuerName || data.username,
            key_name: null,
            status: 'Active',
            expiry: expectedCustomExpiryDate,
            createdDate: new Date(),
        };

    }

}

module.exports = new User();