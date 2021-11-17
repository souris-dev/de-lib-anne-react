import { useEffect, useState } from "react";
import "./Explore.css";
import { BookCard } from "../components/BookCard/BookCard";

import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

const BookSection = (props) => {
  const { themeData: theme } = useContext(ThemeContext);

  return (
    <section className={theme.dark ? `mt-10` : `mt-28`}>
      <div className="-ml-7 bg-gray-700 py-4 w-1/5 mb-16">
        <h2 className={`ml-16 pl-1 text-3xl ${theme.dark ? "tracking-wide font-light" : "font-semibold text-gray-200"}`}>
          {props.sectionTitle}
        </h2>
      </div>

      <div className="swiperclassName flex flex-row space-x-10 ml-10 mt-8">
        {props.children}
      </div>
    </section>
  );
};

export function ExplorePage() {
  const [books, setBooks] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!theme.dark) {
      //document.body.style.backgroundColor = "#";
    }
    setBooks([
      {
        section: "Recommended",
        books: [
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
        ],
      },
      {
        section: "Thriller",
        books: [
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
        ],
      },
      {
        section: "Comedy",
        books: [
          {
            bookTitle: "Anxious People",
            author: "Frederik Backman",
            nstars: 3,
            isbn13: "9781797105826",
            olid: "OL28571780M",
            tags: ["Fiction", "Drama", "Feel good"],
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="mx-7">
      <main>
        <header className={`ml-10 ${theme.dark ? "mt-8" : "mt-16"} bigheader`}>
          <h1 className={`text-5xl tracking-wider ${theme.dark ? "text-white" : "font-bold text-gray-800"}`}>Explore</h1>
        </header>

        {books.map((sectionObject) => (
          <BookSection
            sectionTitle={sectionObject.section}
            key={sectionObject.section}
          >
            {sectionObject.books.map((book) => (
              <BookCard {...book} />
            ))}
          </BookSection>
        ))}
      </main>
    </div>
  );
}
