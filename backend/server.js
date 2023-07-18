const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routerFood = require('./Routes/routes');
require("./Connection/Connection");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({limit:"30mb"}));
app.use(express.urlencoded({limit:'120mb',extended:true}));

PORT = 8000;

app.listen(PORT,()=>{
    console.log(`Port Running on ${PORT}`)
})

app.use("/", routerFood);