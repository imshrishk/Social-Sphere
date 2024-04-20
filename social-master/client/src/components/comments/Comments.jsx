import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({post_ID}) => {
  const [text,settext] = useState("")
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(['comments'], () =>
  makeRequest.get("/comments?post_ID="+post_ID).then((res) => {
    return res.data;
  })
);
const queryClient = useQueryClient();

const mutation = useMutation(
  (newComment) => {
    return makeRequest.post("/comments", newComment);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  }
);

const handleClick = (e) => {
  e.preventDefault();
  mutation.mutate({ text,post_ID });
  settext("")
};
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" 
        placeholder="write a comment" 
        value={text}
        onChange={(e)=>settext(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? "loading" : data.map((comment) => (
    <div key={comment.comment_ID} className="comment">
        <img src={comment.profilePic} alt="" />
        <div className="info">
            <span>{comment.name}</span>
            <p>{comment.text}</p>
        </div>
        <span className="date">{moment(comment.timestamp).fromNow()}</span>
    </div>
))}

    </div>
  );
};

export default Comments;
