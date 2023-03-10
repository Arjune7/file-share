import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './Routes/files.router';

import {v2 as cloudinary} from 'cloudinary'

dotenv.config();
const port = process.env.PORT

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_API_CLOUD,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL!)
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

// Your code
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code



app.use('/api/files' , router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))