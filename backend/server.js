const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
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
// const corsOptions = {
//   origin: ["http://localhost:5173"],
//   credentials: true,
// };
// app.use(corse(corsOptions));

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



app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`));