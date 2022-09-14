//create http server
const express = require("express")
const app = express()
//allow frontend to fetch data
const cors = require("cors")
app.use(cors())
//connect to DB
const connectDB = require('./server/database/connection')


//keep enviroment variable secret
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
const PORT = process.env.PORT||3000

//get token of log request
const morgan = require("morgan")
app.use(morgan('tiny'))
connectDB()//this method is user-defined in './server/database/connection.js'

//bodyparser
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))
//set view engine, use ejs for dynamic html
app.set("view engine", "ejs")

//load asset
const path = require("path")//in-built module
// const { Router } = require("express")
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`server starts on port ${PORT}`)
})