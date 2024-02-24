const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
  createPost: asyncHandler(async (req, res) => {
    //get the payload
    const { description } = req.body;

    //fin the post by title

    const postCreated = await Post.create({ description });
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),

  fetchAllPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  }),

  getPost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  }),

  deletePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);

    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),

  updatePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    res.json({
      status: "success",
      message: "Post updated successfully",
      updatedPost,
    });
  }),
};

module.exports = postController;
