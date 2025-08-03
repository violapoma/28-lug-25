import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useToken } from "../context/tokenContext";
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import { useHandleCommentContext } from "../context/handleCommentContext";

function SingleComment({ comment, onCommentDeleted, onCommentUpdated, ...props}) {
  const putDeleteEP = `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`;

  const { token } = useToken();

  const [successMsg, setSuccessMsg] = useState("");
  
  const {setIsAccordionOpen, setEditingComment} = useHandleCommentContext(); 

  const deleteComment = async () => {
    const response = await fetch(putDeleteEP, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      console.log("deleted comment ", comment._id);
      setSuccessMsg("Comment deleted successfully!");
      if (onCommentDeleted)
        setTimeout(() => {
          setSuccessMsg("");
          onCommentDeleted();
        }, 1000);
    }
  };

  const updateComment = async () => {
    if (onCommentUpdated) {
      console.log('editing comment ', comment);
      setEditingComment(comment);
      setIsAccordionOpen(true); 
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between p-2 mb-1 position-relative" {...props}>
        <div className="">
          <div className="d-flex py-1">
            <FontAwesomeIcon icon={faCircleUser} className="authorIcon" />
            <h2 className="commentAuthor fw-bold">{comment.author}</h2>
          </div>
          <div className="commentBody ">
            <p>{comment.rate} ⭐️</p>
            <p>{comment.comment}</p>
          </div>
        </div>
       

        <div>
          <DropdownButton title="⛭" variant="" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={updateComment}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={deleteComment}>
              Delete
            </Dropdown.Item>
          </DropdownButton>
          <Badge pill className="fs-5 successBadge">{successMsg}</Badge>

        </div>
      </div>
      

    </>
  );
}

export default SingleComment;
