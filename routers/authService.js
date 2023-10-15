const { Router } = require("express");
const app = Router();
const auth = require("../controllers").auth;
app.patch("/login", auth.login);
app.post("/login", auth.login);

module.exports = app;
