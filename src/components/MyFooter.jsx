import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSwatchbook, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from "react-bootstrap";

function MyFooter(){
  return(

      <Row className="bg-dark text-white p-4 mt-3 align-items-center">
        <Col xs={3}><FontAwesomeIcon icon={faSwatchbook} /></Col>
        <Col xs={6} className="text-center fs-3">EpicBooks</Col>
        <Col xs={3} className="text-end"><FontAwesomeIcon icon={faBookOpenReader} /></Col>
      </Row>

  )
}

export default MyFooter;