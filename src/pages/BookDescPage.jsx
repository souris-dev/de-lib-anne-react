import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import "./BookDescPage.css";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { Star, Stars, Tags } from "../components/BookDesc/Components";
import Rating from "react-rating";
import Fade from "react-reveal/Fade.js";
import { getData, postData, toApiEndpoint } from "../utils/serverFetchUtils";

export default function BookDescPage() {
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
    getData(toApiEndpoint(`bookdets-reviews?isbn13=${params.bookId}`)).then(
      (response) => {
        setBookDesc({
          bookTitle: response.bookDet.title,
          summary: response.bookDet.summary,
          author: response.bookDet.author,
          nstars: 3,
          isbn13: response.bookDet.isbn13,
          olid: response.bookDet.olid,
          tags: response.bookDet.tags,
        });
        setBookReviews(response.reviews);
      }
    );
  }, []);

  return (
    <div className="mx-5 sm:mx-9 lg:mx-28">
      <section className="box-border overflow-hidden text-gray-400 body-font lg:min-h-90vh">
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
              <h1 className="mb-1 text-3xl font-medium text-white title-font">
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
              <div className="flex items-center pb-5 mt-1 mb-5 border-b-2 border-gray-800"></div>
              <div className="flex">
                <button className="flex px-6 py-2 ml-auto text-base text-black bg-yellow-300 border-0 rounded focus:outline-none hover:bg-yellow-400">
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen text-gray-400 body-font">
        <div className="py-24 mx-auto">
          <h1 className="mb-12 text-3xl font-medium text-center text-white title-font">
            {bookDesc.bookTitle} <span className="font-thin">Reviews</span>
          </h1>
          <div className="flex flex-col items-end">
            <textarea
              rows="1"
              placeholder="Let us know what you think!"
              onChange={(value) => setReviewInput(value)}
              className="w-full p-4 text-gray-200 bg-transparent border-b-2 resize-none border-review-inp"
            ></textarea>
            <div className="flex flex-row items-center justify-between w-full">
              <Rating
                emptySymbol={<Star filled={false} />}
                fullSymbol={<Star filled />}
                onChange={setRatingStarsInput}
              />
              <button className="w-24 px-2 py-2 mt-3 font-semibold rounded-lg border-rev-btn">
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
  );
}
