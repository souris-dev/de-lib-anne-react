import { BookCard } from "../components/BookCard/BookCard";
import { useState, useEffect } from "react";

import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";

export function SearchPage() {
  const [books, setBooks] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  useEffect(() => {
    setBooks([
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
      {
        bookTitle: "The Family Upstairs",
        author: "Lisa Jewell",
        nstars: 3,
        isbn13: "9781797113821",
        olid: "OL32009030M",
        tags: ["Thriller", "Mystery", "Suspense"],
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
    <div className="mx-7 mb-20">
      <main>
        <header className="ml-10 mt-16 bigheader">
          <h1
            className={`text-5xl ${
              theme.dark ? "tracking-wider text-white" : "tracking-wide text-gray-900 font-semibold"
            }`}
          >
            Search Results
          </h1>
          <h2 className="mt-5 text-3xl header-h2 tracking-wide">
            <span
              className={`${
                theme.dark ? "text-white" : "text-gray-900 font-semibold"
              }`}
              style={{ fontWeight: theme.dark ? "100" : "400" }}
            >
              Results for:{" "}
            </span>
            <span className={`${
                theme.dark ? "text-white" : "text-gray-900 font-semibold"
              }`} style={{ fontWeight: theme.dark ? "200" : "600" }}>searchterm</span>
          </h2>
        </header>

        <section className="mt-14">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-14 flex-wrap ml-10 mt-8 mr-10">
            {books.map((book) => (
              <BookCard
                bookTitle={book.bookTitle}
                author={book.author}
                nstars={book.nstars}
                olid={book.olid}
                isbn13={book.isbn13}
                key={book.olid}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
