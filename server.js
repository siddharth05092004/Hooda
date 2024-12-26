const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

const router = require('./src/routes/router.js')

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
const app = express();
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use('/recipes',router);
app.use((req, res, next) => {
    res.status(404).json({
      message: "The route you are trying to access does not exist."
    });
  });
 

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database connected!")
    app.listen(process.env.PORT || 4000,()=>{
        console.log("Listening at: ",process.env.PORT || 4000);
    })
})
.catch((err)=>{
    console.log(err)
})