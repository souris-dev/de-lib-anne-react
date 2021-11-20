import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import wave from "../assets/wave_2.svg";
import waves from "../assets/wavesOpacity.svg";
import smallDivider from "../assets/divider_small.svg";

export default function BookDescPage() {
  const { themeData: theme } = useContext(ThemeContext);

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

  const [ratingStarsInput, setRatingStarsInput] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const params = useParams();

  useEffect(() => {
    // scroll to beginning
    window.scrollTo(0, 0);

    getData(atServiceEndpoint("book_details", "/bookdets-reviews"), {
      isbn13: params.bookId,
    }).then((response) => {
      console.log(response.bookDet.nstars);
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
    });
  }, []);

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
                <div className="flex">
                  <button className="flex px-6 py-2 ml-auto text-base text-black bg-yellow-300 border-0 rounded focus:outline-none hover:bg-yellow-400">
                    Add to wishlist
                  </button>
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
                  rows="1"
                  placeholder="Let us know what you think!"
                  onChange={(value) => setReviewInput(value)}
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
