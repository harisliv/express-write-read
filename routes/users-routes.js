const express = require("express");
const session = require("express-session");


const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

router.post("/logout", userControllers.logout);

router.get("/", userControllers.getUsers);

module.exports = router;
