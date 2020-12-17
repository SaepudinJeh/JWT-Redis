const { hashSync, compareSync } = require('bcryptjs');

const { dbCon } = require('../configuration');
const { userSchema, loginSchema } = require('../validators');

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
    };

    static login(userData) {
        return new Promise((resolve, reject) => {

            const validation = loginSchema.validate(userData);

            if (validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return resolve(error);
            };

            dbCon('users', async(db) => {
                try {
                    const user = await db.findOne( {'$or': [
                        {email: userData['email']}
                    ]}, {projection: { email: 1, password: 1}} );

                    if (!user) {
                        const error = new Error('User not registered');
                        error.statusCode = 404;
                        return resolve(error);
                    }

                    if (!compareSync(userData['password'], user.password)) {
                        const error = new Error('Email/password not valid');
                        error.statusCode = 404;
                        return resolve(error);
                    }

                    resolve(user);
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
};

module.exports = User;