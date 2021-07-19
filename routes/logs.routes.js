const router = require("express").Router();
const upload = require("../config/storage.config");
const logControllers = require("../controllers/log.controllers");

router.get("/newlog", logControllers.create);
router.post("/newlog", upload.single("image"), logControllers.doCreate);

router.get("/:id", logControllers.viewLog);

module.exports = router;
