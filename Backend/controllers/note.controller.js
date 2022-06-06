const Note = require("../models/note.model");
const User = require("../models/user.model");
function create(req, res) {
    const { id } = req.user;
    const { level, content, date } = req.body;
    if (!level || !content) {
        return res.status(400).json({
            message: 'Invalid level or content or date'
        });
    }
    Note.create({
        level: level,
        content: content,
        date: date,
        owner: id,
    }, (err, note) => {
        if (err) return res.status(400).json({
            message: 'Invalid level or content or date'
        });
        User.findByIdAndUpdate(id, { $push: { noteList: note._id } }, { new: true }, (err, user) => {
            if (err) return res.status(400).json({
                message: 'Invalid level or content or date'
            });
            return res.status(200).json(note);
        });
    })

}
function getAll(req, res) {
    const { id } = req.user;
    User.findById(id).populate('noteList').exec((err, user) => {
        if (err) return res.status(400).json({
            message: 'Invalid level or content or date'
        });
        const { noteList } = user;
        return res.status(200).json(noteList);
    })
}
function getById(req, res) {
    const { id } = req.params;
    Note.findById(id, (err, note) => {
        if (err) return res.status(400).json({
            message: 'Invalid level or content or date'
        });
        return res.status(200).json(note);
    })
}
function update(req, res) {
    const { id } = req.params;
    const { level, content, date, isCompleted } = req.body;
    Note.findByIdAndUpdate(id, { level: level, content: content, isCompleted: isCompleted }, { new: true }, (err, note) => {
        // console.log(err);
        if (err) return res.status(400).json({
            message: 'Invalid level or content or date'
        });
        return res.status(200).json(note);
    })
}
function deleteById(req, res) {
    const { id } = req.params;
    Note.findByIdAndDelete(id, (err, note) => {
        if (err) return res.status(400).json({
            message: 'Invalid level or content or date'
        });
        if (note) {
            User.findByIdAndUpdate(note.owner, { $pull: { noteList: note._id } }, { new: true }, (err, user) => {
                if (err) return res.status(400).json({
                    message: 'Invalid level or content or date'
                });
                return res.status(200).json("Delete succesfully!");
            });
        } else {
            return res.status(200).json("Delete fail! Note invalid.");

        }
    })
}

async function deleteAll(req, res) {
    const { id } = req.user;
    const user = await User.findById(id);

    user.noteList.forEach(note => {
        Note.findByIdAndDelete(note, (err, note) => {
            if (err) return res.status(400).json({
                message: 'Invalid level or content or date'
            });
        })
    })
    user.noteList = [];
    await user.save();
    return res.status(200).json("Delete all succesfully!");

}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById,
    deleteAll
}

