import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { useSelected } from "../context/selectedContext";
import { useToken } from "../context/tokenContext";
import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";

function CommentArea() {
  const { asin } = useParams();

  const { token } = useToken();

  const { title } = useSelected();

  const commentsEP = `https://striveschool-api.herokuapp.com/api/books/${asin}/comments`;

  const [comments, setComments] = useState([]);

  const [average, setAverage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  //da passare ai children
  const onCommentChanged = () => {
    fetchComments();
  };

  function fetchComments() {
    setIsLoading(true);
    fetch(commentsEP, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((comments) => {
        setComments(comments);
        setAverage(averageRating(comments));
      })
      .finally(() => setIsLoading(false));
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
  if (isLoading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="secondary" className="spinner">
          <p className="fs-1 p-2">📖</p>
        </Spinner>
      </div>
    );
  if (asin && comments.length === 0) return <h2>🤷‍♀️ Still no comments 🤷‍♀️</h2>;

  return (
    <div className="commentArea d-flex flex-column justify-content-center">
      <h2>{title}</h2>
      <AddComment onCommentAdded={onCommentChanged} />

      {comments.length > 0 && (
        <div className="fs-3">
          {" "}
          <p className="text-end mb-0 px-4">⭐️ {average.toFixed(1)} / 5</p>
          <p>Other readers say:</p>
        </div>
      )}
      <CommentList
        className="commentList"
        comments={comments}
        onCommentDeleted={onCommentChanged}
        onCommentUpdated={onCommentChanged}
      />
    </div>
  );
}

export default CommentArea;
