// import router from express and export
const router = require('express').Router();
const { signin, signup, forgot } = require('../controllers/auth.controller');
router.post("/signin", signin)
router.post("/signup", signup)
router.post("/forgot", forgot)

module.exports = router;