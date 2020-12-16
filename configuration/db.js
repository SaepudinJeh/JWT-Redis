const mongodb = require('mongodb');

const dbCon = (coll, cb) => {
    mongodb.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( async (client) => {
        console.log('Mongodb connected...');

        const db = client.db(process.env.DB_NAME).collection(coll);

        await cb(db)
        client.close();

    })
    .catch(err => console.log(err.message));
}

module.exports = dbCon;