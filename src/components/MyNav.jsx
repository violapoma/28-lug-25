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
      <Navbar.Brand as={Link} to="/" className="fs-1">
        EpiBooks <span className="fs-3">📚</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
  
      {/* Rimosso Navbar.Collapse */}
  
      <div
        className="d-flex align-items-center"
        style={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        <div
          className="d-flex align-items-center gap-2"
          style={{ width: "100%", maxWidth: "600px" }}
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
      </div>
    </Container>
  </Navbar>
  );
}

export default MyNav;
