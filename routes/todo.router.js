const express = require("express");
const TodoModel = require("../model/todo.model");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await TodoModel.find({});
    res.render("index", { data });
});

router.post("/add", async (req, res) => {
    const { title, desc } = req.body;
    await TodoModel.create({ title, desc });
    // await new TodoModel({ title, desc }).save();
    res.redirect("/");
});

router.post("/update/", async (req, res) => {
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

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await TodoModel.findByIdAndDelete(id);
    } catch (e) {
        console.log(e.message);
    }
    res.redirect("/");
});

module.exports = router;
