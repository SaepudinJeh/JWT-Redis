const { hashSync } = require('bcryptjs');

const { dbCon } = require('../configuration');
const { userSchema } = require('../validators');

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

    checkExistence() {
        return new Promise((resolve, reject) => {
            dbCon('users', async (db) => {
                try {
                    const user = await db.findOne({ email: this.userData['email']});
                    console.log(user);
                    if (!user) {
                        resolve({ check: false });
                    } else if (this.userData['email'] === user.email) {
                        resolve({
                            check: true,
                            message: 'This email is already in use'
                        })
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    };

    static validate(userData) {
        return userSchema.validate(userData);
    }
};

module.exports = User;