import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import movieRoute from './routes/movieRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (res, req) => {
    req.send("Hello");
    return res.send(234).send("Welcome to homepage")
});

app.use('/movie',movieRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("App Connected to database")
    app.listen(PORT, () => {
        console.log(`App is listening to ${PORT}`)
    })
})
.catch(err =>{
    console.log(err)
})

