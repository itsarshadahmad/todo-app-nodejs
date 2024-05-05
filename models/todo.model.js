const { Schema, model, default: mongoose } = require("mongoose");

const TodoSchema = new Schema({
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
});

const TodoModel = model("Todo", TodoSchema);

module.exports = TodoModel;
