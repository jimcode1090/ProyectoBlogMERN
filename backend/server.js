const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postsRouter");

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

//! Routes handlers
app.use('/', postRouter)


//! Not found
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found on our server",
  });
});


//! Error handdling middleware
app.use((err, req, res, next) => {
  // prepare the error message
  const message = err.message || "Internal Server Error";
  const stack = err.stack || "no stack trace";
  console.log(message);
  res.status(500).json({
    message,
    stack,
  });
});

app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`));
