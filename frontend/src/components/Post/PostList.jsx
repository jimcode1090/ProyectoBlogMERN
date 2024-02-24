import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllPostsAPI } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const PostList = () => {

  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["list-posts"],
    queryFn: fetchAllPostsAPI,
  });

  console.log(data);

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {isSuccess && <p>Post listado exitosamente</p>}
      {isError && <p>{error.message}</p>}

      {data?.posts.map((post) => {
        return (
          <div key={post?._id}>
            <h2>{post?.title}</h2>
            <p>{post?.description}</p>
            <Link to={`/posts/${post?._id}`}>
              <button>Editar</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
