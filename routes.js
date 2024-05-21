const express = require("express");
const { registerUser, login, getUser, authenticateToken } = require("./controllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/user", authenticateToken, getUser);

module.exports = router;
