const router = require('express').Router();
const { create, getAll, getById, update, deleteAll, deleteById, } = require('../controllers/note.controller');

router.post("/create", create)
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", deleteById);
router.delete("/", deleteAll);

module.exports = router;