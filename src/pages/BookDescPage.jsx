import { useEffect, useState } from "react";
import React from "react";
import "./BookDescPage.css";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { Star, Stars, Tags } from "../components/BookDesc/Components";
import Rating from "react-rating";
import Fade from "react-reveal/Fade.js";

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

  useEffect(() => {
    setBookDesc({
      ...bookDesc,
      bookTitle: "Anxious People",
      author: "Frederik Backman",
      summary: `Synth chartreuse iPhone lomo cray raw denim brunch everyday
      carry neutra before they sold out fixie 90's microdosing.
      Tacos pinterest fanny pack venmo, post-ironic heirloom
      try-hard pabst authentic iceland.`,
      nstars: 3,
      nreviews: 4,
      isbn13: "9781797105826",
      olid: "OL28571780M",
      tags: ["Fantasy", "Drama", "Feel good"],
    });

    setBookReviews([
      {
        reviewText: `Synth chartreuse iPhone lomo cray raw denim brunch everyday
              carry neutra before they sold out fixie 90's microdosing.
              Tacos pinterest fanny pack venmo, post-ironic heirloom
              try-hard pabst authentic iceland.`,
        nstars: 3,
        reviewAuthor: "APA CHUCHU",
      },
      {
        reviewText: `Synth chartreuse iPhone lomo cray raw denim brunch everyday
              carry neutra before they sold out fixie 90's microdosing.
              Tacos pinterest fanny pack venmo, post-ironic heirloom
              try-hard pabst authentic iceland.`,
        nstars: 4,
        reviewAuthor: "CHIN CHIN CHU",
      },
      {
        reviewText: `Synth chartreuse iPhone lomo cray raw denim brunch everyday
              carry neutra before they sold out fixie 90's microdosing.
              Tacos pinterest fanny pack venmo, post-ironic heirloom
              try-hard pabst authentic iceland.`,
        nstars: 3,
        reviewAuthor: "GILGAMESH",
      },
      {
        reviewText: `Synth chartreuse iPhone lomo cray raw denim brunch everyday
              carry neutra before they sold out fixie 90's microdosing.
              Tacos pinterest fanny pack venmo, post-ironic heirloom
              try-hard pabst authentic iceland.`,
        nstars: 1,
        reviewAuthor: "JEANNE D'ARC",
      },
    ]);
  }, []);

  return (
    <div className="mx-5 sm:mx-9 lg:mx-28">
      <section className="text-gray-400 body-font overflow-hidden lg:min-h-90vh box-border">
        <div className="my-24 w-full">
          <div className="flex flex-row flex-wrap items-center justify-between">
            <img
              alt="bookcover"
              className="lg:w-1/2 w-full book-img object-contain object-center rounded-lg cursor-pointer"
              src={`https://covers.openlibrary.org/b/olid/${bookDesc.olid}-L.jpg`}
              onClick={() =>
                window.open(`https://openlibrary.org/isbn/${bookDesc.isbn13}`)
              }
            />

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-10 sm:mt-6 lg:mt-0">
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {bookDesc.bookTitle}
              </h1>
              <h2 className="text-base title-font mt-2 text-gray-500 tracking-widest">
                {bookDesc.author}
              </h2>
              <h2 className="text-sm title-font mt-2 text-gray-500 tracking-widest inline-block">
                ISBN13: {bookDesc.isbn13}
              </h2>
              <div className="flex mb-4 mt-2">
                <span className="flex items-center">
                  <Stars nstars={bookDesc.nstars} />
                  <span className="ml-3">{bookReviews.length} Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{bookDesc.summary}</p>
              <div className="mt-1 flex flex-row items-center">
                <Tags tags={bookDesc.tags} />
              </div>
              <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
              <div className="flex">
                <button className="flex ml-auto text-black bg-yellow-300 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-400 rounded text-base">
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-gray-400 body-font min-h-screen">
        <div className="py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
            {bookDesc.bookTitle} <span className="font-thin">Reviews</span>
          </h1>
          <div className="flex flex-col items-end">
            <textarea
              rows="1"
              placeholder="Let us know what you think!"
              onChange={(value) => setReviewInput(value)}
              className="resize-none bg-transparent w-full p-4 text-gray-200 border-b-2 border-review-inp"
            ></textarea>
            <div className="flex flex-row items-center justify-between w-full">
              <Rating
                emptySymbol={<Star filled={false} />}
                fullSymbol={<Star filled />}
                onChange={setRatingStarsInput}
              />
              <button className="border-rev-btn mt-3 w-24 rounded-lg py-2 px-2 font-semibold">
                Submit
              </button>
            </div>
          </div>

          <Fade distance="100px" bottom duration={1200} fraction={0.3}>
            <div className="flex flex-row flex-wrap -m-4 mt-6">
              {bookReviews.map((review) => (
                <ReviewCard
                  nstars={review.nstars}
                  reviewText={review.reviewText}
                  reviewAuthor={review.reviewAuthor}
                  key={Math.random() * 100}
                />
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
