import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { useSelected } from "../context/selectedContext";
import { useToken } from "../context/tokenContext";
import { useParams } from "react-router";
import { useHandleCommentContext } from "../context/handleCommentContext";

function CommentArea() {
  const { asin } = useParams();

  const { token } = useToken();

  const { title } = useSelected();

  const commentsEP = `https://striveschool-api.herokuapp.com/api/books/${asin}/comments`;

  const [comments, setComments] = useState([]);

  const [average, setAverage] = useState(0);

  const {setEditingComment, isAccordionOpen, setIsAccordionOpen} = useHandleCommentContext(); 
  
  console.log("isAccordionOpen", isAccordionOpen);

  console.log("asin : asin in CommentArea", asin);
  // console.log('token in commentarea: ', token);

  //da passare ai children
  const onCommentChanged = () => {
    fetchComments();
  }

  function fetchComments() {
    fetch(commentsEP, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((comments) => {
        setComments(comments);
        setAverage(averageRating(comments));
      });
  }

  useEffect(() => {
    if (asin) fetchComments();
    else setComments([]);
  }, [asin]);

  function averageRating(comments) {
    const howMany = comments.length;
    const ratingsSum = comments.reduce((acc, comment) => acc + comment.rate, 0);
    return ratingsSum / howMany;
  }

  return (
    <div className="commentArea">
      <h2>{title}</h2>
      <AddComment
        onCommentAdded={onCommentChanged}
      />

      {comments.length > 0 && (
        <div className="fs-3">
          {" "}
          <p className="text-end mb-0 px-4">⭐️ {average.toFixed(1)} / 5</p>
          <p>Other readers say:</p>
        </div>
      )}

      {asin && comments.length == 0 ? (
        <h2>🤷‍♀️ Still no comments 🤷‍♀️</h2>
      ) : (
        <CommentList
          className={`commentList`}
          comments={comments}
          onCommentDeleted={onCommentChanged}
          onCommentUpdated={onCommentChanged}
          />
      )}
    </div>
  );
}

export default CommentArea;
