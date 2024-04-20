import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from 'react-query';
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  console.log(data);
  
  return (
    <div className="posts">
      {error 
      ? "something went wrong!" 
      : isLoading
      ? "loading"
      : data && data.map(post => (
        <Post post={post} key={post.post_ID}/>
      ))}
    </div>
  );
};

export default Posts;
