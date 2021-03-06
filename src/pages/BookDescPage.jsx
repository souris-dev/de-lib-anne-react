import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import "./BookDescPage.css";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { Star, Stars, Tags } from "../components/BookDesc/Components";
import Rating from "react-rating";
import Fade from "react-reveal/Fade.js";
import {
  getData,
  postData,
  atServiceEndpoint,
} from "../utils/serverFetchUtils";

import { ThemeContext } from "../contexts/ThemeProvider";
import { LoginContext } from "../contexts/LoginProvider";
import { useContext } from "react";
import wave from "../assets/wave_2.svg";
import waves from "../assets/wavesOpacity.svg";
import smallDivider from "../assets/divider_small.svg";
import DefaultLoadingScreen from "../components/Loaders/DefaultLoadingScreen";

export default function BookDescPage() {
  const { themeData: theme } = useContext(ThemeContext);
  const { isSignedIn: isSignedIn } = useContext(LoginContext);

  const [bookDesc, setBookDesc] = useState({
    bookTitle: "",
    summary: "",
    author: "",
    nstars: 0,
    isbn13: "",
    olid: "",
    tags: [],
  });

  const [bookReviews, setBookReviews] = useState([]);
  const [userHasBookInWishlist, setUserHasBookInWishlist] = useState(false);

  const [ratingStarsInput, setRatingStarsInput] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState("");

  const { username: retrieveUsername } = useContext(LoginContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // scroll to beginning
    window.scrollTo(0, 0);

    getData(atServiceEndpoint("book_details", "/bookdets-reviews"), {
      isbn13: params.bookId,
    }).then((response) => {
      if (response.status == 404) {
        alert("Sorry! That book isn't in our database.");
        navigate(-1);
        return;
      }

      setBookDesc({
        bookTitle: response.bookDet.title,
        summary: response.bookDet.summary,
        author: response.bookDet.author,
        nstars: response.bookDet.nstars,
        isbn13: response.bookDet.isbn13,
        olid: response.bookDet.olid,
        tags: response.bookDet.tags,
      });
      setBookReviews(response.reviews);
      setDataLoaded(true);
    });

    if (isSignedIn) {
      getData(atServiceEndpoint("wishlist", "/haswishitem"), {
        isbn13: params.bookId,
      }).then((response) => {
        if (response.message && response.message.includes("present")) {
          setUserHasBookInWishlist(true);
        } else {
          setUserHasBookInWishlist(false);
        }
      });
    }
  }, []);

  const tryPostingReview = () => {
    if (reviewInput == "") {
      return;
    }
    postData(atServiceEndpoint("book_details", "/createreview"), {
      review: reviewInput,
      nstars: ratingStarsInput,
      isbn13: params.bookId,
    })
      .then((response) => {
        if (response.status == 403) {
          alert("Please sign in first to post a review.");
          return;
        }
        setBookReviews([
          ...bookReviews,
          {
            review: reviewInput,
            nstars: ratingStarsInput,
            reviewAuthor: retrieveUsername,
            _id: response._id,
          },
        ]);
        setReviewInput("");
      })
      .catch((err) => {
        console.log(err);
        alert("Sorry there was an error in posting the review.");
      });
  };

  const tryAddInWishlist = () => {
    if (!isSignedIn) {
      setError("Sign in to add the book to your wishlist!");
      return;
    }

    postData(
      atServiceEndpoint("wishlist", "/addwishitem"),
      { isbn13: bookDesc.isbn13 },
      "PUT"
    )
      .then((response) => {
        switch (response.message) {
          case "Wishlist book addition: success.":
            setUserHasBookInWishlist(true);
            break;

          case "Wishlist creation and book addition: success.":
            setUserHasBookInWishlist(true);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  };

  const removeWishlistItem = () => {
    postData(
      atServiceEndpoint("wishlist", "/deletewishitem"),
      {
        isbn13: params.bookId,
      },
      "DELETE"
    ).then((response) => {
      if (response.status == 200) {
        setUserHasBookInWishlist(false);
      }
    });
  };

  if (!dataLoaded) {
    return <DefaultLoadingScreen />;
  }

  return (
    <div className="static">
      <div className="mx-5 sm:mx-9 lg:mx-28">
        <section
          className={`box-border overflow-hidden ${
            theme.dark ? "text-gray-400" : "text-gray-700"
          } body-font lg:min-h-90vh`}
        >
          <div className="w-full my-24">
            <div className="flex flex-row flex-wrap items-center justify-between">
              <img
                alt="bookcover"
                className="object-contain object-center w-full rounded-lg cursor-pointer lg:w-1/2 book-img"
                src={`https://covers.openlibrary.org/b/olid/${bookDesc.olid}-L.jpg`}
                onClick={() =>
                  window.open(`https://openlibrary.org/isbn/${bookDesc.isbn13}`)
                }
              />

              <div className="w-full mt-10 lg:w-1/2 lg:pl-10 lg:py-6 sm:mt-6 lg:mt-0">
                <h1
                  className={`mb-1 text-3xl font-medium ${
                    theme.dark ? "text-white" : "text-black"
                  } title-font`}
                >
                  {bookDesc.bookTitle}
                </h1>
                <h2 className="mt-2 text-base tracking-widest text-gray-500 title-font">
                  {bookDesc.author}
                </h2>
                <h2 className="inline-block mt-2 text-sm tracking-widest text-gray-500 title-font">
                  ISBN13: {bookDesc.isbn13}
                </h2>
                <div className="flex mt-2 mb-4">
                  <span className="flex items-center">
                    <Stars nstars={bookDesc.nstars} />
                    <span className="ml-3">{bookReviews.length} Reviews</span>
                  </span>
                </div>
                <p className="leading-relaxed">{bookDesc.summary}</p>
                <div className="flex flex-row items-center mt-1">
                  <Tags tags={bookDesc.tags} />
                </div>

                {theme.dark ? (
                  <div
                    className={`flex items-center pb-5 mt-1 mb-5 border-b-2 ${
                      theme.dark ? "border-gray-800" : "border-gray-200"
                    }`}
                  ></div>
                ) : (
                  <div className="mt-8"></div>
                )}
                <div className="flex flex-col items-end">
                  {userHasBookInWishlist ? (
                    <button
                      onClick={removeWishlistItem}
                      className={`flex ml-auto ${
                        theme.dark ? "text-white" : "text-white bg-red-500"
                      } transition-all duration-500 border border-red-600 py-2 px-6 focus:outline-none hover:bg-red-700 hover:text-white rounded text-base`}
                    >
                      Remove from wishlist
                    </button>
                  ) : (
                    <button
                      className="flex px-6 py-2 ml-auto text-base text-black bg-yellow-300 border-0 rounded focus:outline-none hover:bg-yellow-400"
                      onClick={tryAddInWishlist}
                    >
                      Add to wishlist
                    </button>
                  )}
                  <span
                    className={`mt-3 flex flex-col items-end cursor-pointer ${
                      error == "" ? "hidden" : "block"
                    } ${theme.dark ? "text-red-800" : "text-red-400"}`}
                    onClick={() => setError("")}
                  >
                    {error}
                    <span className="block">(Click to hide this message)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="relative min-h-screen text-gray-400 body-font -mx-28"
          style={theme.dark ? {} : { backgroundColor: "#f7e9d0" }}
        >
          {theme.dark ? (
            ""
          ) : (
            <div
              className="absolute w-full h-24 bg-cover -top-4"
              style={{ backgroundImage: `url(${waves})` }}
            ></div>
          )}
          <div className="mx-28">
            <div className="py-24 mx-auto">
              <h1
                className={`mb-12 mt-4 font-medium text-center ${
                  theme.dark ? "text-3xl text-white" : "text-3xl text-black"
                } title-font`}
              >
                {bookDesc.bookTitle}{" "}
                <span className={theme.dark ? "font-thin" : "font-bold"}>
                  Reviews
                </span>
              </h1>
              <div className="flex flex-col items-end">
                <textarea
                  value={reviewInput}
                  rows="1"
                  placeholder="Let us know what you think!"
                  onChange={(e) => setReviewInput(e.target.value)}
                  className={`w-full p-4 bg-transparent border-b-2 resize-none ${
                    theme.dark
                      ? "text-gray-200 border-review-inp"
                      : "text-gray-700 border-review-inp-light"
                  }`}
                ></textarea>
                <div className="flex flex-row items-center justify-between w-full">
                  <Rating
                    emptySymbol={<Star filled={false} />}
                    fullSymbol={<Star filled />}
                    onChange={setRatingStarsInput}
                  />
                  <button
                    className={`w-24 px-2 py-2 mt-3 font-semibold rounded-lg ${
                      theme.dark ? "border-rev-btn" : "border-rev-btn-light"
                    }`}
                    onClick={tryPostingReview}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <Fade distance="100px" bottom duration={1200} fraction={0.3}>
                <div className="flex flex-row flex-wrap mt-6 -m-4">
                  {bookReviews.map((review) => (
                    <ReviewCard
                      nstars={review.nstars}
                      reviewText={review.review}
                      reviewAuthor={review.reviewAuthor}
                      key={review._id}
                    />
                  ))}
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
