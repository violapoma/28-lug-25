import { useState, useEffect, useRef, use } from "react";
import { Card } from "react-bootstrap";
import "../assets/styles.css";
import MovingTitle from "./MovingTitle";
import { useSelected } from "../context/selectedContext";


// TODO: da rifare perché è una pagina di dettaglio
function BookCard({ book, ...props }) {
  const { selected, setSelected } = useSelected();
  const { setTitle } = useSelected();



  const handleSelected = () => {
    setSelected((oldAsin) => (oldAsin == book.asin ? "" : book.asin));
    setTitle(book.title);
  };

  // per testo che si muove; useRef non causa rendering al cambiamento, qui serve per misurare
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;

    if (container && textEl) {
      if (textEl.scrollWidth > container.clientWidth) {
        setShouldScroll(true);
      }
    }
  }, [book.title]);

  return (
    
      <Card {...props} //per test
        className={`cardStyle h-100 flex-row justify-content-between flex-md-column align-items-center p-2 ${
          selected && "selected borderSelected"
        }`}
      >
        <Card.Img
          variant="top"
          src={book.img}
          className={`cardImg rounded-2`}
          onClick={handleSelected}
        />
        <Card.Body className="d-flex flex-column justify-content-around">
          <div>
            <MovingTitle title={book.title} />
            <Card.Text className={`${selected && "text-end"}`}>
              Price: {book.price}€
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
  
  );
}

export default BookCard;
