const express = require("express");
const {
    showLoginPage,
    handleLoginRequest,
    showSignupPage,
    handleSignupRequest,
    handleLogoutRequest,
} = require("../controller/user.controller");

const router = express.Router();

router.get("/login", showLoginPage);
router.post("/login", handleLoginRequest);
router.get("/signup", showSignupPage);
router.post("/signup", handleSignupRequest);
router.post("/logout", handleLogoutRequest);

module.exports = router;
