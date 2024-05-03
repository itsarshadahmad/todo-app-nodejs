const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: (val) => val != "",
            message: (prop) => `${prop.value} should not be empty`,
        },
    },
    desc: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

const TodoModel = model("Todo", todoSchema);

module.exports = TodoModel;
