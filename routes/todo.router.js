const express = require("express");
const {
    getUserTodo,
    addNewTodoItem,
    updateTodoItem,
    deleteTodoItem,
} = require("../controller/todo.controller");
const router = express.Router();

router.get("/", getUserTodo);
router.post("/add", addNewTodoItem);
router.post("/update/", updateTodoItem);
router.post("/delete/:id", deleteTodoItem);

module.exports = router;
