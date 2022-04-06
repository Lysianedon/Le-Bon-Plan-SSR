const express = require("express");
const handlebars = require("express-handlebars");
const port = 8000;
const cors = require('cors');
//Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require('Joi');
const { joiPassword } = require('joi-password');

const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const Users = require('./routes/Users');
const Products = require('./routes/Products');

//dotenv config
dotenv.config({
    path: "../config.env",
});

//Postgress config
const pg = require('pg');
const { Pool, Client } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false }});

// const client = new Client({
//     host: process.env.PGHOST,
//     user : process.env.PGUSER,
//     port : process.env.PGPORT,
//     password : process.env.PGPASSWORD,
//     database : process.env.PGDATABASE
// })

// client.connect(err => {
//     if (err) {
//       console.error('connection error', err.stack)
//     } else {
//       console.log('connected to Postgres')
//     }
//   })

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

//  -------------------------- Middlewares --------------------------
app.use(cookieParser());
// pour le css et le js dans le html
app.use(express.static(path.join(__dirname, "/public")));
// body du form de login
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Redirecting routes -----------
app.use('/users', Users);
app.use('/products', Products);

const debug = app.use((req,res,next) => {
    console.log("request received.");
    next();
})

// ------------------------------- Routes ------------------------------------
// -------------------------- localhost:8000/ --------------------------------

app.get('/', (req,res)=> {

    res.render('home')
})

app.get('/login', (req,res)=> {
    res.render('login')
})

app.post('/login', async (req,res)=> {
    let userInfos = req.body;
    console.log(userInfos);
    let users = await Postgres.query('SELECT * FROM users');
    return res.json(users);
})

// app.post('/signup', (req,res)=> {
//     res.render('signup')
// })





//Starting the server
app.listen(port, () => {
    console.log(`Local host launched at port ${port}`)
})