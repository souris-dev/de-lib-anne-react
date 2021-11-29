import { useEffect, useState } from "react";
import "./Explore.css";
import { BookCard } from "../components/BookCard/BookCard";

import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import { atServiceEndpoint, getData } from "../utils/serverFetchUtils";
import DefaultLoadingScreen from "../components/Loaders/DefaultLoadingScreen";

const BookSection = (props) => {
  const { themeData: theme } = useContext(ThemeContext);

  return (
    <section
      style={{
        marginTop: theme.dark ? `3vh` : `5vh`,
        marginBottom: theme.dark ? `2vh` : `7vh`,
      }}
    >
      <div
        className={`-ml-7 ${
          theme.dark ? "mb-8" : "bg-gray-700 mb-12"
        } py-4 w-1/5 min-w-min`}
      >
        <h2
          className={`ml-16 pl-1 pr-5 text-3xl ${
            theme.dark
              ? "tracking-wide font-light"
              : "font-semibold text-gray-200"
          }`}
        >
          {props.sectionTitle}
        </h2>
      </div>

      <div className={`swiperclassName flex flex-wrap flex-row ml-10`}>
        {props.children}
      </div>
    </section>
  );
};

export function ExplorePage() {
  const [books, setBooks] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  const [prominentInterests, setProminentInterests] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getData(atServiceEndpoint("explore", "/recommendations")).then(
      (response) => {
        console.log("Setting recommended books");
        setBooks([
          {
            section: "Recommended",
            books: response.recommendations,
          },
        ]);
        setProminentInterests(response.interestTags);
        setDataLoaded(true);
      }
    );
  }, []);

  useEffect(async () => {
    // refer https://stackoverflow.com/questions/66505445/how-to-make-api-calls-for-each-element-in-array
    const resultsByTag = await Promise.all(
      prominentInterests.map(async (prominentInterest) => {
        return {
          section: prominentInterest,
          books: await getData(
            atServiceEndpoint("explore", "/recommendations/bykeyword"),
            { keyword: prominentInterest }
          ),
        };
      })
    );

    setBooks([...books, ...resultsByTag]);
  }, [JSON.stringify(prominentInterests)]);

  if (!dataLoaded) {
    return <DefaultLoadingScreen />;
  }

  return (
    <div className="mx-7 mb-24">
      <main>
        <header className={`ml-10 ${theme.dark ? "mt-16" : "mt-8"} bigheader`}>
          <h1
            className={`text-5xl tracking-wider ${
              theme.dark ? "text-white" : "font-bold text-gray-800"
            }`}
          >
            Explore
          </h1>
        </header>

        {books.map((sectionObject) => (
          <BookSection
            sectionTitle={sectionObject.section}
            key={sectionObject.section}
          >
            {sectionObject.books.map((book) => (
              <div className="mr-8 mt-8">
                <BookCard
                  bookTitle={book.title}
                  isbn13={book.isbn13}
                  author={book.author}
                  nstars={book.nstars}
                  olid={book.olid}
                  tags={book.tags}
                />
              </div>
            ))}
          </BookSection>
        ))}
      </main>
    </div>
  );
}
