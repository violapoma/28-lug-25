import { Col, Row } from "react-bootstrap";

function MyFooter(){
  return(

      <Row className="bg-dark text-white p-4 mt-3 align-items-center">
        <Col xs={3}>Info</Col>
        <Col xs={6} className="text-center fs-3">EpicBooks</Col>
        <Col xs={3} className="text-end">Browse</Col>
      </Row>

  )
}

export default MyFooter;