import { useEffect, useState } from "react";
import { Tags, Stars } from "../components/BookDesc/Components";
import Fade from "react-reveal/Fade.js";
import { Link } from "react-router-dom";

import "./WishlistPage.css";

import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

export function WishlistPage() {
  const [bookDescs, setBookDescs] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  useEffect(() => {
    setBookDescs([
      {
        bookTitle: "Anxious People",
        author: "Frederik Backman",
        nstars: 3,
        isbn13: "9781797105826",
        olid: "OL28571780M",
        tags: ["Fiction", "Drama", "Feel good"],
      },
      {
        bookTitle: "The Guest List",
        author: "Lucy Foley",
        nstars: 4,
        isbn13: "9780008297183",
        olid: "OL29926388M",
        tags: ["Mystery", "Suspense", "Thriller"],
      },
      {
        bookTitle: "The Family Upstairs",
        author: "Lisa Jewell",
        nstars: 3,
        isbn13: "9781797113821",
        olid: "OL32009030M",
        tags: ["Thriller", "Mystery", "Suspense"],
      },
    ]);
  }, []);

  return (
    <section className="text-gray-400 body-font">
      <h1 className={`text-4xl font-medium title-font ${theme.dark ? "text-white" : "text-gray-800"} mt-10 text-center`}>
        Souris' <span className={theme.dark ? `font-thin` : `font-bold`}>Wishlist</span>
      </h1>
      <Fade bottom cascade>
        <div className="py-24 mx-auto">
          {bookDescs.map((bookDesc) => (
            <div
              key={bookDesc.isbn13}
              className={`flex items-center lg:w-4/5 border-b pb-10 mb-10 ${theme.dark ? "border-gray-800" : "border-wishlist-book"} mx-5 sm:mx-10 md:mr-16 lg:mx-auto md:flex-row flex-col`}
            >
              <div className="sm:mr-10 md:mr-3 inline-flex items-center w-full sm:w-1/2 md:w-1/3 justify-center text-yellow-400 flex-shrink-0">
                <img
                  alt="bookcover"
                  className="lg:w-1/2 w-full sm:w-1/2 object-contain object-center rounded-lg cursor-pointer"
                  src={`https://covers.openlibrary.org/b/olid/${bookDesc.olid}-L.jpg`}
                  onClick={() =>
                    window.open(
                      `https://openlibrary.org/isbn/${bookDesc.isbn13}`
                    )
                  }
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-4 lg:py-6 mt-10 sm:mt-6 lg:mt-0">
                <h1 className={`${theme.dark ? "text-white" : "text-gray-800"} text-3xl title-font font-medium mb-1`}>
                  <Link to={`/books/${bookDesc.bookTitle}`}>
                    {bookDesc.bookTitle}
                  </Link>
                </h1>
                <h2 className={`text-base title-font mt-2 ${theme.dark ? "text-gray-500" : "text-gray-800"} tracking-widest`}>
                  {bookDesc.author}
                </h2>
                <h2 className={`text-sm title-font mt-2 ${theme.dark ? "text-gray-500" : "text-gray-600"} tracking-widest inline-block`}>
                  ISBN13: {bookDesc.isbn13}
                </h2>
                <div className="flex mb-4 mt-2">
                  <span className="flex items-center">
                    <Stars nstars={bookDesc.nstars} />
                  </span>
                </div>
                <div className="mt-3 flex flex-row">
                  <Tags tags={bookDesc.tags} />
                </div>
                <div className="flex mt-4">
                  <button className={`flex ml-auto ${theme.dark ? "text-white" : "text-white bg-red-500"} transition-all duration-500 border border-red-600 py-2 px-6 focus:outline-none hover:bg-red-700 hover:text-white rounded text-base`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}
