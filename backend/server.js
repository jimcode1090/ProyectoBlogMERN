const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const Post = require('./models/Post/Post');
const connectDB = require('./utils/connectDB');

//Call the db
connectDB();

const app = express();

//! PORT
const PORT = 5000;

//Middlewares
app.use(express.json()); //Pass json data
// corse middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// ! Create post
app.post("/api/v1/posts/create", async (req, res, next) => {
  try {
    //get the payload
    const {title, description} = req.body;
  
    //fin the post by title
    const postFound = await Post.findOne({title});
    if (postFound) {
      throw new Error("Post already exists");
    }

    const postCreated = await Post.create({ title, description});
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  } catch (error) {
    next(error);
  }
});
// ! List posts
app.get('/api/v1/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: 'success',
      message: 'Posts fetched successfully',
      posts
    })
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// ! Update post
app.put('/api/v1/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error('Post not found');
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title: req.body.title,
      description: req.body.description
    }, { new: true });

    res.json({
      status: 'success',
      message: 'Post updated successfully',
      updatedPost
    })


  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// ! Get post
app.get('/api/v1/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error('Post not found');
    }
    res.json({
      status: 'success',
      message: 'Post fetched successfully',
      postFound
    })

  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//! Delete post
app.delete('/api/v1/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);

    res.json({
      status: 'success',
      message: 'Post deleted successfully',
    })

  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//! Error handdling middleware
app.use((err, req, res, next) => {
  // prepare the error message
  const message = err.message || 'Internal Server Error';
  const stack = err.stack || 'no stack trace';
  console.log(message);
  res.status(500).json({
    message,
    stack
  });
});



app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`));