import express from "express"
import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import { Readable } from "stream"
import fs from "fs"
import sharp from "sharp"

dotenv.config()
const router = express.Router()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

// Routes
router.route("/").get((req, res) => {
    res.send("Hi! this is the back-end for ...")
})

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body 
        const aiResponse = await openai.createImage({
            prompt,
            n: 4,
            size: "1024x1024",
            response_format: "b64_json"
        })

        const images = aiResponse.data.data

        res.status(200).json({ images })
    } catch (err) {
        res.status(500).send(err?.response.data.error.message)
    }
})

router.route("/variations").post(async (req,res) => {
    try {
        const id = Math.floor(Math.random() * 99999)
        const { photo } = req.body
        const base64Image = photo.replace("data:image/png;base64,", "")
        fs.writeFile(`image-${id}.png`, base64Image, "base64", async (err) => {
            if(err) throw new Error("Error ocurred while creating image")
            const aiResponse = await openai.createImageVariation(
                fs.createReadStream(`image-${id}.png`),
                4,
                "1024x1024",
                "b64_json"
            )
            const images = aiResponse.data.data
            fs.unlink(`image-${id}.png`, (err) => {
                if (err) throw err;
            })
            res.status(200).json({ images })
        })
    } catch(err) {
        res.status(500).send(err)
    }
})

export default router