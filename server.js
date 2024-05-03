"use strict";
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo.router");

const app = express();
mongoose.connect("mongodb://localhost:27017/todo").catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", todoRouter);

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
