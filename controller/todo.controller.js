const TodoModel = require("../models/todo.model");
const UserModel = require("../models/user.model");

const getUserTodo = async (req, res) => {
    const user = req.session.user;
    if (user) {
        const currentUser = await UserModel.where({ email: user }).findOne();
        const data = await TodoModel.find({ createdBy: currentUser.id });
        return res.render("index", { data });
    }
    return res.redirect("/login");
};

const addNewTodoItem = async (req, res) => {
    const { title, desc } = req.body;
    const user = req.session.user;
    if (user) {
        const currentUser = await UserModel.where({ email: user }).findOne();
        await TodoModel.create({
            title,
            desc,
            createdBy: currentUser._id,
        }).catch((err) => console.log(err));
    }
    res.redirect("/");
};

const updateTodoItem = async (req, res) => {
    const { title, desc, id } = req.body;
    await TodoModel.findByIdAndUpdate(id, {
        title,
        desc,
    }).catch((err) => console.log(err));
    return res.redirect("/");
};

const deleteTodoItem = async (req, res) => {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id).catch((err) => console.log(err));
    return res.redirect("/");
};

module.exports = {
    getUserTodo,
    addNewTodoItem,
    updateTodoItem,
    deleteTodoItem,
};
