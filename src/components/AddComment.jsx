import { useEffect, useState } from "react";
import { Button, Form, Accordion } from "react-bootstrap";
import { useToken } from "../context/tokenContext";
import { useParams } from "react-router";
import { useHandleCommentContext } from "../context/handleCommentContext";

function AddComment({ onCommentAdded }) {
  const postEP = "https://striveschool-api.herokuapp.com/api/comments/";
  const putDeleteEP = `https://striveschool-api.herokuapp.com/api/comments/`; //+ id commento

  const { asin } = useParams();
  const { isAccordionOpen, setIsAccordionOpen, editingComment, setEditingComment } =
    useHandleCommentContext();

  const [formData, setFormData] = useState({
    elementId: asin,
    rate: "",
    comment: "",
  });

  useEffect(() => {
    if (editingComment) {
      setFormData({
        rate: editingComment.rate,
        comment: editingComment.comment,
        elementId: asin,
        _id: editingComment._id, //per differenziare lampost o la put
      });
    } else {
      setFormData({
        rate: "",
        comment: "",
        elementId: asin,
      });
    }
  }, [editingComment, asin]);

  const [validated, setValidated] = useState(false);

  const [rate, setRate] = useState(1);

  const { token } = useToken();

  console.log("token in AddComment", token);

  const postOrUpdateComment = async () => {
    const isEditing = !!formData._id; //così diventa booleano vero
    const url = isEditing ? `${putDeleteEP}${formData._id}` : postEP;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      console.log("response dentro alla post", response);

      if (response.ok) {
        if (onCommentAdded) onCommentAdded();
        setTimeout(clearFields, 1000);
      } else {
        console.error("Errore nell’aggiunta del commento");
      }
    } catch (error) {
      console.error("Errore nella fetch :", error);
    }
  };

  function clearFields() {
    setFormData((prev) => ({
      ...prev,
      rate: "",
      comment: "",
    }));
    setValidated(false);
    setIsAccordionOpen(false);
    setEditingComment(null); 
  }

  function submitData(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  
    const form = evt.currentTarget;
  
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
  
    setValidated(true);
    console.log("formData", formData);
  
    postOrUpdateComment();
  }

  function handleChanges(evt) {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <>
      <Accordion
        onSelect={() => setIsAccordionOpen((prev) => !prev)}
        activeKey={isAccordionOpen ? "0" : null}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Leave a comment 📝</Accordion.Header>
          <Accordion.Body>
            <Form noValidate validated={validated} onSubmit={submitData}>
              <Form.Select
                aria-label="Rating"
                className="mb-3"
                name="rate"
                value={formData.rate}
                onChange={handleChanges}
                required
              >
                <option disabled hidden value="">
                  Rating
                </option>
                <option value="1">1 ⭐️</option>
                <option value="2">2 ⭐️</option>
                <option value="3">3 ⭐️</option>
                <option value="4">4 ⭐️</option>
                <option value="5">5 ⭐️</option>
              </Form.Select>

              <Form.Group>
                <Form.Control
                  as="textarea"
                  aria-label="comment"
                  name="comment"
                  value={formData.comment}
                  placeholder="Your Comment Here"
                  onChange={handleChanges}
                  required
                />
              </Form.Group>

              <Button type="submit" className="mt-2 submitBtn">
                Submit
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default AddComment;
