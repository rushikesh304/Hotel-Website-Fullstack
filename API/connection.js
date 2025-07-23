

const {MongoClient} = require('mongodb')    //import module mongodb, Create a new MongoClient instance
const url= 'mongodb://localhost:27017';   //path for connections
const databaseName='website'             //database name
const client= new MongoClient(url);   //MongoClient class is a class that allows for making Connections to MongoDB

async function dbConnect()
{
    let result = await client.connect();    //return promise 
    db= result.db(databaseName);          //connect with database
    return db       //connect with user
}

module.exports=dbConnect;

