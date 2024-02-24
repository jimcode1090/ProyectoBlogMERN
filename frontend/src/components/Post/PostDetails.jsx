import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchPostAPI } from '../../APIServices/posts/postsAPI';

const PostDetails = () => {

  const {postId} = useParams();

  const {isError, isLoading, isSuccess, data, error } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => fetchPostAPI(postId),
  })

  console.log(data)

  return (
    <div>
      <h1>{ data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
    </div>
  )
}

export default PostDetails
