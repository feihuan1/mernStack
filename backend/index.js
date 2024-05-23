import express from "express"; 
import mongoose from "mongoose";
import cors from 'cors'

import { PORT, mongoDBURL } from "./config.js";
import bookRoute from './routes/booksRoute.js'
import { Book } from "./models/bookModel.js";

const app = express(); 

//midleware fpr parsing request body
app.use(express.json())

//midleware handle cors policy
//option 1 : allow all origin with Default of cors(*) 
app.use(cors())

//option2: allow custom origins 
// app.use(
//     cors({
//         origin:'http://localhost:3000', 
//         methods: ["GET", "POST", "PUT", "DELETE"], 
//         allowedHeaders: ["Content-Type"]
//     })
// )


app.get('/', (req, res) => {
    res.send('now it works, noob!!!')
})

app.use("/books", bookRoute)

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("app connected to database")
        app.listen(PORT,() => {
            console.log(`running on port: ${PORT}`)
        })
    })
    .catch((e)=> {
        console.log(e)
    })

