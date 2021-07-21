const router = require("express").Router();
const upload = require("../config/storage.config");
const logControllers = require("../controllers/log.controllers");
const commentControllers = require('../controllers/comment.controllers');

// Create
router.get("/new-log", logControllers.create);
router.post("/new-log", upload.single("image"), logControllers.doCreate);

// Update
router.get('/:id/edit', logControllers.edit);
router.post('/:id/edit', upload.single("image"), logControllers.doEdit);

// Delete
router.post('/:id/delete', logControllers.doDelete);

// Read
router.get("/:id", logControllers.viewLog);

// Comments
router.post('/:logid/comments', commentControllers.newComment);

router.post('/comments/:id/delete', commentControllers.deleteComment)

module.exports = router;
