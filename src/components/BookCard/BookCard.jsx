import "./BookCard.css";
import { Stars } from "../BookDesc/Components";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../ThemeProvider";
import { useContext } from "react";

export const BookCard = (props) => {
  const { themeData: theme } = useContext(ThemeContext);

  return (
    <Link to={`/books/${props.isbn13}`}>
      <div className={`card ${theme.dark ? "shadow-lg hover:shadow-2xl" : "card-light"} card-fixed-width rounded-2xl`}>
        <img
          className={`rounded-t-2xl ${theme.dark ? "bg-gray-900" : "bg-gray-200"} h-70percent bookpreview`}
          src={`https://covers.openlibrary.org/b/olid/${props.olid}-L.jpg`}
        />

        <div className="flex flex-col h-1/4 justify-between">
          <div className="ml-3 mt-2">
            <span className={`booktitle text-lg`}>{props.bookTitle}</span>
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
