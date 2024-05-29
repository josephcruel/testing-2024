// Import Statements

import express from "express"
import "express-async-errors"
import posts from "./routes/posts.js"
import "./loadEnv.js"


// Server Setup
// Setting the port to PORT 3000
const PORT = process.env.PORT || 3000
// Make an instance of the express application
const app = express()

// Middleware Setup
app.use(express.json())

// Route Handling 
app.use("/posts", posts)

// Error Handling Middleware Setup
app.use((err, req, res, next) => {
    res.status(500).send("An unexpected error occurred.")
})

//Starts the server
app.listen(PORT, () => {"Running on port 3000."})
