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
    let collection = await db.collection("posts")
    let results = await collection.find({})
        .limit(10)
        .toArray()

    res.send(results).status(200)
})

// Fetch the latest posts
router.get("/latest", async (req, res) => {
    let collection = await db.collection("posts")
    let results = await collection.aggregate([
        {"$assessment": {"student": 1, "title": 1, "date": 1}},
        {"$sort": {"date": -1}},
        {"$limit": 3}
    ]).toArray()
    res.send(results).status(200)
})