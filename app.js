// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "library-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const authorModel = require("./models/author.model");
const BookModel = require("./models/Book.model");
app.use("/", indexRoutes);

app.use('/',require('./routes/books.routes'))
app.use('/',require('./routes/Author.routes'))



// BookModel.create({title:"Zevanjas Wisdom",description:"Good stuff",rating:10,author_id:"63bdb95af2236ac26efada4f"})  
// authorModel.create({name:"Max"})

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
