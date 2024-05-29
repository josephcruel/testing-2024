// Import MongoClient Class
import {MongoClient} from "mongodb"

// Connection Setup
//retriving the mongodb string by providing the URI 
const connectionString = process.env.ATLAS_URI || ""

// Creating MongoClient 
// Creating an instance of mongoclient, connect to the mongodb server
const client = new MongoClient(connectionString)

// Connecting to MongoDB

let connection

try {
    //trying to connect to mongodb 
    connection = await client.connect()
}
catch(e){
    //logs the error if unsuccessful
    console.error(e)
}