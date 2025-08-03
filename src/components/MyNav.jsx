import { Navbar, Container, Nav, Form} from "react-bootstrap";

import { useSearchValue } from "../context/searchContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

function MyNav() {
  const { category, setCategory } = useSearchValue();
  const { searchValue, setSearchValue } = useSearchValue();
  const { setActive } = useSearchValue();

  const handleSelection = (evt) => {
    setCategory(evt.target.value);
  };

  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/'); 
  }, [category]); 

  const handleSearch = (evt) => {
    navigate('/');
    setSearchValue(evt.target.value);
    setActive(1); //torna a pagina 1, altrimenti cerca solo dalla pagina corrente in poi
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md">
      <Container>
        {/* end -> mette la classe active solo su questo pezzo dell'indirizzo */}
        <Navbar.Brand as={Link} to="/" className="fs-1"> 
          EpiBooks <span className="fs-3">📚</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div
          className="d-flex align-items-center gap-2"
          style={{ minWidth: "300px", flexGrow: 1 }}
        >
          <Form.Select
            className="w-50"
            aria-label="genre"
            value={category}
            onChange={handleSelection}
          >
            <option disabled hidden value="">
              Genres
            </option>
            <option value="fantasy">Fantasy 🧚‍♂️</option>
            <option value="history">History 🪖</option>
            <option value="horror">Horror 🧛‍♀️</option>
            <option value="romance">Romance 👩‍❤️‍💋‍👩</option>
            <option value="scifi">Sci-fi 👽</option>
          </Form.Select>

          <div className="position-relative w-100">
            <Form.Control
              className="pe-4"
              type="text"
              placeholder="🕵️‍♀️ Search title here..."
              value={searchValue}
              onChange={handleSearch}
            />
            {searchValue && (
              <button
                onClick={handleClear}
                aria-label="clear-search"
                className="clearInputBtn"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNav;
