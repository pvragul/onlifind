const express = require("express");
const app = express();
const routers = require("./src/routers");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", routers.userService);
app.use("/api/v1/auth", routers.authService);

module.exports = app;
