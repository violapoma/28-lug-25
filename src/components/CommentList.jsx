import { useHandleCommentContext } from "../context/handleCommentContext";
import SingleComment from "./SingleComment";

function CommentList({ comments, onCommentDeleted, onCommentUpdated}) {
  console.log(comments);
  const {isAccordionOpen} = useHandleCommentContext(); 
  return (
    <div
      className={`commentList overflow-y-scroll ${
        isAccordionOpen ? "reduced" : ""
      }`}
    >
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} data-testid="singleComment"> 
            <SingleComment
              comment={comment}
              onCommentDeleted={onCommentDeleted}
              onCommentUpdated={onCommentUpdated}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
