"use strict";
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const TodoModel = require("./todo.model");

const app = express();
mongoose.connect("mongodb://localhost:27017/todo").catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    const data = await TodoModel.find({});
    res.render("index", { data });
});

app.post("/add", async (req, res) => {
    const { title, desc } = req.body;
    await TodoModel.create({ title, desc });
    // await new TodoModel({ title, desc }).save();
    res.redirect("/");
});

app.post("/update/", async (req, res) => {
    const { title, desc, id } = req.body;
    try {
        await TodoModel.findByIdAndUpdate(id, {
            title,
            desc,
        });
    } catch (e) {
        console.log(e.message);
    }
    res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await TodoModel.findByIdAndDelete(id);
    } catch (e) {
        console.log(e.message);
    }
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
