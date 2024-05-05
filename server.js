"use strict";
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo.router");
const userRouter = require("./routes/user.router");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
mongoose.connect("mongodb://localhost:27017/todo").catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
    session({
        name: "todo-app",
        secret: "Who Let The Dogs Out?",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
            secure: false,
        },
    })
);

app.use("/", todoRouter);
app.use(userRouter);

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
