// Import Statements 

// Import express application
import express from "express"

// Import db from the connection.js
import db from "../db/connection.js"

// Import objectid from mongodb
import { ObjectId } from "mongodb"

const router = express.Router()



// Routes Definitions
router.get("/", async (req, res) => {
    // Get the collection of posts from the database
    let collection = await db.collection("posts");
    // Find all posts and limit the results to 10
    let results = await collection.find({}).limit(10).toArray();
    // Send the results as a response with status code 200
    res.send(results).status(200);
});

// Fetch the latest posts
router.get("/latest", async (req, res) => {
    // Get the collection of posts from the database
    let collection = await db.collection("posts");
    // Aggregate pipeline to get the latest 3 posts
    let results = await collection.aggregate([
        {"$assessment": {"student": 1, "title": 1, "date": 1}},
        {"$sort": {"date": -1}},
        {"$limit": 3}
    ]).toArray();
    // Send the results as a response with status code 200
    res.send(results).status(200);
});

// Get a Single Posts/Note
router.get("/:id", async (req, res) => {
    // Get the collection of posts from the database
    let collection = await db.collection("posts");
    // Construct the query to find the post by its ID
    let query = {_id: ObjectId(req.param.id)};
    // Find the post with the specified ID
    let result = await collection.findOne(query);
    
    // If the post is not found, send a "Not Found" response with status code 404
    if (!result) 
        res.send("Not Found").status(404);
    // Otherwise, send the post as a response with status code 200
    else 
        res.send(result).status(200);
});

// Add a new post
router.post("/", async (req, res) => {
    // Get the collection of posts from the database
    let collection = await db.collection("posts");
    // Extract the new post data from the request body
    let newDocument = req.body;
    // Add the current date to the new post data
    newDocument.date = new Date();
    // Insert the new post document into the collection
    let result = await collection.insertOne(newDocument);
    // Send the result of the insertion as a response with status code 200
    res.send(result).status(200);
});

// Update post with new content
router.patch("/post/:id", async (req, res) => {
    // Construct the query to find the post by its ID
    const query = {_id: ObjectId(req.params.id)};
    // Define the updates to be applied to the post
    const updates = {
        $push: {posts: req.body}
    };

    // Get the collection of posts from the database
    let collection = await db.collection("posts");
    // Update the post document with the specified ID
    let result = await collection.updateOne(query, updates);

    // Send the result of the update operation as a response with status code 200
    res.send(result).status(200);
});


// Delete a post
router.delete("/:id", async (req, res) => {
    // Construct the query to find the post by its ID
    const query = {_id: ObjectId(req.params.id)};

    // Get the collection of posts from the database
    const collection = db.collection("posts");
    // Delete the post document with the specified ID
    let result = await collection.deleteOne(query);

    // Send the result of the delete operation as a response with status code 200
    res.send(result).status(200);
});
