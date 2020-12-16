const { hashSync } = require('bcryptjs');

const { dbCon } = require('../configuration');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    };

    save(cb) {
        dbCon('users', async(db) => {
        try {
            const hashedPassword = hashSync(this.userData['password'], 10);
            this.userData['password'] = hashedPassword;

            const result = await db.insertOne(this.userData);
            console.log(result);

            cb();

        } catch (err) {
            cb(err)
        }
        })
    };
};

module.exports = User;