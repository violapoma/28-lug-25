import CommentArea from "../components/CommentArea";
import { Col, Container, Row } from "react-bootstrap";
import BookDetailsCard from "../components/BookDetailsCard";
import { HandleCommentProvider } from "../context/handleCommentContext";

function BookDetails() {
  return (
    <Container className="d-flex flex-column align-items-stretch ">
      <Row className="">
        <Col lg={4}>
          <BookDetailsCard />
        </Col>
        <HandleCommentProvider>
          <Col lg={8} className="vh-100">
            <CommentArea />
          </Col>
        </HandleCommentProvider>
      </Row>
    </Container>
  );
}

export default BookDetails;
