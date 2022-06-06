const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    level: {
        type: String,
        default: "low",
    },
    content: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Number,
        default: new Date().getTime(),
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
    }

})

module.exports = mongoose.model("notes", noteSchema);