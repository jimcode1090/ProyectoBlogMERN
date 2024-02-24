const express = require("express");
const router = express.Router();
const postController = require("../../controllers/posts/postController");

router.post("/api/v1/posts/create", postController.createPost);

router.get("/api/v1/posts", postController.fetchAllPosts);

router.put("/api/v1/posts/:postId", postController.updatePost);

router.get("/api/v1/posts/:postId", postController.getPost);

router.delete("/api/v1/posts/:postId", postController.deletePost);

module.exports = router;
