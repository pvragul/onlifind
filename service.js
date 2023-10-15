const express = require("express")
const app = express();
const validator = require("./helpers")
const routers = require("./routers");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/user", routers.userService);
app.use("/api/v1/auth", routers.authService)
// const port = process.env.PORT || 5001;
// app.use((request, response) => {
//     response.json({ message: 'Hey! This is your server response!' }); 
//  });

module.exports = app;
