import { useEffect, useState } from "react";
import { Tags, Stars } from "../components/BookDesc/Components";
import Fade from "react-reveal/Fade.js";
import { Link } from "react-router-dom";
import DefaultLoadingScreen from "../components/Loaders/DefaultLoadingScreen";

import "./WishlistPage.css";

import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import {
  atServiceEndpoint,
  getData,
  postData,
} from "../utils/serverFetchUtils";
import { LoginContext } from "../contexts/LoginProvider";

export function WishlistPage() {
  const [bookDescs, setBookDescs] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  const [dataLoaded, setDataLoaded] = useState(false);
  const { username: retrieveUsername } = useContext(LoginContext);

  useEffect(() => {
    getData(atServiceEndpoint("wishlist", "/getwishlist"))
      .then((response) => {
        if (response.userWishlist) {
          setBookDescs(response.userWishlist);
          setDataLoaded(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const removeWishlistItem = (isbn13) => {
    postData(
      atServiceEndpoint("wishlist", "/deletewishitem"),
      {
        isbn13: isbn13,
      },
      "DELETE"
    ).then((response) => {
      if (response.status == 200) {
        setBookDescs(bookDescs.filter((book) => book.isbn13 != isbn13));
      }
    });
  };

  if (!dataLoaded) {
    return <DefaultLoadingScreen />;
  }

  return (
    <section className="min-h-screen text-gray-400 body-font">
      <h1
        className={`text-4xl font-medium title-font ${
          theme.dark ? "text-white" : "text-gray-800"
        } mt-10 text-center`}
      >
        {retrieveUsername.charAt(retrieveUsername.length - 1) == "s"
          ? retrieveUsername + "'"
          : retrieveUsername + "'s"}{" "}
        <span className={theme.dark ? `font-thin` : `font-bold`}>Wishlist</span>
      </h1>
      <Fade bottom cascade>
        <div className="py-24 mx-auto">
          {bookDescs.map((bookDesc) => (
            <div
              key={bookDesc.isbn13}
              className={`flex items-center lg:w-4/5 border-b pb-10 mb-10 ${
                theme.dark ? "border-gray-800" : "border-wishlist-book"
              } mx-5 sm:mx-10 md:mr-16 lg:mx-auto md:flex-row flex-col`}
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-full text-yellow-400 sm:mr-10 md:mr-3 sm:w-1/2 md:w-1/3">
                <img
                  alt="bookcover"
                  className="object-contain object-center w-full rounded-lg cursor-pointer lg:w-1/2 sm:w-1/2"
                  src={`https://covers.openlibrary.org/b/olid/${bookDesc.olid}-L.jpg`}
                  onClick={() =>
                    window.open(
                      `https://openlibrary.org/isbn/${bookDesc.isbn13}`
                    )
                  }
                />
              </div>
              <div className="w-full mt-10 lg:w-1/2 lg:pl-4 lg:py-6 sm:mt-6 lg:mt-0">
                <h1
                  className={`${
                    theme.dark ? "text-white" : "text-gray-800"
                  } text-3xl title-font font-medium mb-1`}
                >
                  <Link to={`/books/${bookDesc.isbn13}`}>{bookDesc.title}</Link>
                </h1>
                <h2
                  className={`text-base title-font mt-2 ${
                    theme.dark ? "text-gray-500" : "text-gray-800"
                  } tracking-widest`}
                >
                  {bookDesc.author}
                </h2>
                <h2
                  className={`text-sm title-font mt-2 ${
                    theme.dark ? "text-gray-500" : "text-gray-600"
                  } tracking-widest inline-block`}
                >
                  ISBN13: {bookDesc.isbn13}
                </h2>
                <div className="flex mt-2 mb-4">
                  <span className="flex items-center">
                    <Stars nstars={bookDesc.nstars} />
                  </span>
                </div>
                <div className="flex flex-row mt-3">
                  <Tags tags={bookDesc.tags} />
                </div>
                <div className="flex mt-4">
                  <button
                    onClick={() => removeWishlistItem(bookDesc.isbn13)}
                    className={`flex ml-auto ${
                      theme.dark ? "text-white" : "text-white bg-red-500"
                    } transition-all duration-500 border border-red-600 py-2 px-6 focus:outline-none hover:bg-red-700 hover:text-white rounded text-base`}
                  >
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
