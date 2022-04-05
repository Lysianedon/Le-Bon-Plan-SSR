const express = require("express");
const handlebars = require("express-handlebars");
const port = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const Users = require('./routes/Users');
const Products = require('./routes/Products');

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


// -------------------------- Routes  --------------------------------
app.use('/users', Users);
app.use('/products', Products);








//Starting the server
app.listen(port, () => {
    console.log(`Local host launched at port ${port}`)
})