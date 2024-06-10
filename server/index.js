const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome");
})

const port = process.env.PORT || 5000;
const dbUri = process.env.ATLAS_KEY;

app.listen(port, (req, res) => {
    console.log("Server active")
})

mongoose.connect(dbUri).then(() => {
    console.log("mongo connected");
}).catch((error) => {
    console.log(error)
})