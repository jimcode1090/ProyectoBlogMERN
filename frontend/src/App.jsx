import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import CreatePost from "./components/Post/CreatePost";
import PostList from "./components/Post/PostList";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import UpdatePost from "./components/Post/UpdatePost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostList />} path="/lists" />
        <Route element={<UpdatePost />} path="/posts/:postId" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
