import { useEffect, useState } from "react";
import "./Explore.css";
import { BookCard } from "../components/BookCard/BookCard";

const BookSection = (props) => {
  return (
    <section className="mt-10">
      <div className="ml-10">
        <h2 className="text-3xl font-sans tracking-wide font-light">
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

  useEffect(() => {
    setBooks([
      {
        section: "Recent",
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
        <header className="ml-10 mt-8 bigheader">
          <h1 className="text-5xl tracking-wider text-white">Explore</h1>
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
