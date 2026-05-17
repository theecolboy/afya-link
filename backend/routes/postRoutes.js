const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createPost,
  getPosts,
  getPostById,
  addComment,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(protect, createPost);
router.route("/:id").get(getPostById);
router.route("/:id/comment").put(protect, addComment);

module.exports = router;