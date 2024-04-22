const express= require("express");
const user = require("../controller/user");


const userRoute = express();

userRoute.post("/register", user.register);
userRoute.post("/login", user.login);

module.exports = userRoute;