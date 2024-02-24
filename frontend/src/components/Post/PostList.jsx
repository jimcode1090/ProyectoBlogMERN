import React from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deletePostAPI, fetchAllPostsAPI} from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const PostList = () => {

  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["list-posts"],
    queryFn: fetchAllPostsAPI,
  });

  const postMutation = useMutation({
      mutationKey: ["delete-post"],
      mutationFn: deletePostAPI,
  })

  const deleteHandler = async (postId) => {
      postMutation.mutateAsync(postId).then(()=>{
        refetch();
      }).catch((e) => console.log(e));
  }

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
            <button
              onClick={() => deleteHandler(post?._id)}
            >Eliminar</button>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
