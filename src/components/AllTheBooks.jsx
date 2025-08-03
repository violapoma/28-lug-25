import { Col, Container, Row, Spinner } from "react-bootstrap";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import "../assets/styles.css";
import MyPagination from "./MyPagination";
import { useSearchValue } from "../context/searchContext";
import { Link } from "react-router";

function AllTheBooks() {
  console.log("mounting AllTheBooks");
  const { category, searchValue, active, setActive } = useSearchValue();
  console.log("category", category);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [booksForPage, setBooksForPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const perPage = 21;

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/data/${category}.json`);
      const books = await res.json();

      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredBooks(filtered);
      setActive(1);
    } catch (error) {
      console.error("Errore nel caricamento dei libri:", error);
      setFilteredBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchBooks();
    }
  }, [category, searchValue]);

  useEffect(() => {
    const startIdx = perPage * (active - 1);
    const endIdx = startIdx + perPage;
    setBooksForPage(filteredBooks.slice(startIdx, endIdx));
  }, [filteredBooks, active]);

  const pages = Math.ceil(filteredBooks.length / perPage);

  if (isLoading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="secondary" className="spinner">
          <p className="fs-1 p-2">📖</p>
        </Spinner>
      </div>
    );
  if (booksForPage.length == 0)
    return (
      <div className="text-center my-5 py-5">
        <p className="fs-1 ">😿 No books found 😿</p>
        <p className="fs-3">Have you tried switching categories?</p>
      </div>
    );

  return (
    <Container className="mt-4 py-2">
      <div className="d-flex justify-content-center align-items-center">
        <MyPagination
          howManyPages={pages}
          active={active}
          setActive={setActive}
        />
      </div>

      <Row className="g-3 align-items-center mb-3">
        {booksForPage.map((book) => (
          <Col xs={12} md={6} lg={4} key={book.asin}>
            <Link to={`/books/${book.asin}`}>
              <BookCard book={book} data-testid="bookCard" />
            </Link>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center align-items-center">
        <MyPagination
          howManyPages={pages}
          active={active}
          setActive={setActive}
        />
      </div>
    </Container>
  );
}

export default AllTheBooks;
