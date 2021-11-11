import "./BookCard.css";
import { Stars } from "../BookDesc/Components";
import { Link } from "react-router-dom";

export const BookCard = (props) => {
  return (
    <Link to={`/books/${props.isbn13}`}>
      <div className="card card-fixed-width rounded-2xl shadow-lg hover:shadow-2xl">
        <img
          className="rounded-t-2xl bg-gray-900 h-70percent bookpreview"
          src={`https://covers.openlibrary.org/b/olid/${props.olid}-L.jpg`}
        />

        <div className="flex flex-col h-1/4 justify-between">
          <div className="ml-3 mt-2">
            <span className="booktitle text-lg">{props.bookTitle}</span>
            <span className="bookauthor text-sm">By {props.author}</span>
          </div>

          <div className="ml-3 mt-2">
            <Stars nstars={props.nstars} />
          </div>
        </div>
      </div>
    </Link>
  );
};
