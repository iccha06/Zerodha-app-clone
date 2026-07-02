const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  heartbeat,getCurrentUser,
} = require("../controllers/authController");

const verifyToken = require("../middlewares/authMiddleware"); 

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);
router.post("/logout", verifyToken, logout);
router.post("/heartbeat", verifyToken, heartbeat);

module.exports = router;