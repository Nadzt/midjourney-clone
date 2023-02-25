// imports
import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import connectDB from "./mongodb/connect.js"
import postRoutes from "./mongodb/routes/postRoutes.js"
import midjourneyRoutes from "./mongodb/routes/midjourneyRoutes.js"

// const
const app = express()
const port = 8080

// app config
dotenv.config()
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/midjourney", midjourneyRoutes)


// routes
app.get("/", async(req, res) => {
    res.send("hello from Midjourney")
})

// server initialization
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(port, () => console.log(`Server is online on port: http://localhost:${port}`))
    } catch (err) {
        console.log(err)
    }

}
startServer()
