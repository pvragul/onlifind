const { Router } = require("express");
const app = Router();
const users = require("../controllers/users");
const validator = require("../helpers/validator");

app.post("/create", validator(users.creater));
app.patch("/update", validator(users.updater));
app.post("/deactivateAccount/:id", validator(users.deleter));
app.post("/deleteAccount/:id", validator(users.deleter));
app.get("/all", validator(users.getAllUsers));
app.get("/getUserById", validator(users.getUserById));

module.exports = app;
