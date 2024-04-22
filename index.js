const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>console.log("MongoDB connected...")).catch((err)=>console.log("MongoDB failed to conenct",err));

const app= express();

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT; 

app.use((req, res, next) => {
    console.log(`inside index${req.method} ${req.url}`);
    next();
});

app.use("/", urlRoute);
app.use("/user",userRoute);

app.listen(PORT,()=>{console.log(`running in ${PORT}`)})