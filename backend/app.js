const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/routes');

//server creation
const App = express();

//db connection
require('./utils/DB')();

//middlewares
App.use(bodyParser.json());
App.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }))
App.use('/api',router);


App.get('/',(req,res)=>{
    res.status(200).send({message:'this is data'});
})


App.listen(process.env.PORT,()=>{
    console.log(`listning at port ${process.env.PORT}`)
})