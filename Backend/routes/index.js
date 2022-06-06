const router = require("express").Router();

router.use("/auth", require("./auth"));
// use middelware to protect all routes after this middleware
router.use(require("../middleware/index"));

router.use("/note", require("./note"));


module.exports = router;