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
app.post("/api/v1/posts/create", async (req, res) => {
    try {
      //get the payload
      const postData = req.body;
      console.log(req.body);
      const postCreated = await Post.create(postData);
      res.json({
        status: "success",
        message: "Post created successfully",
        postCreated,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
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
  }catch (error) {
    console.log(error);
    res.json(error);
  }
})

// ! Update post
app.put('/api/v1/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postFound = await Post.findById(postId);
    if(!postFound) {
      throw new Error('Post not found');
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title: req.body.title,
      description: req.body.description
    }, {new: true});

    res.json({
      status: 'success',
      message: 'Post updated successfully',
      updatedPost
    })


  }catch (error) {
    console.log(error);
    res.json(error);
  }
})

// ! Get post
app.get('/api/v1/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postFound = await Post.findById(postId);
    if(!postFound) {
      throw new Error('Post not found');
    }
    res.json({
      status: 'success',
      message: 'Post fetched successfully',
      postFound
    })

  }catch (error) {
    console.log(error);
    res.json(error);
  }
})




app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`));