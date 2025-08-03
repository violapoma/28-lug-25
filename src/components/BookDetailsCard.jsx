import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchValue } from "../context/searchContext";

function BookDetailsCard() {
  const { asin } = useParams();
  const { category } = useSearchValue();

  const [book, setBook] = useState(null); 

  const fetchBook = async () => {
    try {
      const res = await fetch(`/data/${category}.json`);
      const books = await res.json();

      const book = books.find((book) => book.asin === asin);

      console.log("fetched book", book);
      setBook(book);
    } catch (err) {
      console.log("errore in BookDetails", err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [asin, category]);

  console.log('bookDrtailsImg', book)

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <img className="bookDetailsImg" src={book.img} alt={book.title}></img>
    </div>
  ); 
}

export default BookDetailsCard; 