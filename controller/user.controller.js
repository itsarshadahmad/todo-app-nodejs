const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const showLoginPage = (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    return res.render("login");
};

const handleLoginRequest = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await UserModel.where({ email }).findOne();
        if (user != null) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    req.session.user = email;
                    req.session.save((err) => console.log(err));
                    return res.redirect("/");
                } else {
                    return res.redirect("/login");
                }
            });
        }
    } else {
        res.redirect("/login");
    }
};

const showSignupPage = (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    return res.render("signup");
};

const handleSignupRequest = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        const user = await UserModel.where({ email }).findOne();
        if (user == null) {
            await UserModel.create({ username, email, password });
            req.session.user = email;
            req.session.save((err) => console.log(err));
        }
        res.redirect("/");
    } else {
        res.redirect("/signup");
    }
};

const handleLogoutRequest = async (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        else {
            res.clearCookie("todo-app");
            res.redirect("/login");
        }
    });
};

module.exports = {
    showLoginPage,
    handleLoginRequest,
    showSignupPage,
    handleSignupRequest,
    handleLogoutRequest,
};
