const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noteList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'notes'
        }
    ]
});

module.exports = mongoose.model('Users', userSchema);