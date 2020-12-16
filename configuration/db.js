const mongodb = require('mongodb');

const dbCon = (coll, cb) => {
    mongodb.connect('mongodb://localhost:27017/KoskuDb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( async (client) => {
        console.log('Mongodb connected...');

        const db = await client.db("KoskuDb").collection(coll);

        await cb(db)
        client.close();

    })
    .catch(err => console.log(err.message));
}

dbCon('Users', async(db) => {
    const result = await db.findOne({
        "Username": "saepudin@gmail.com",
        "password":"12345"
    })

    console.log(result);
})

module.exports = dbCon;