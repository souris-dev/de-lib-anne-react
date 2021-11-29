import { BookCard } from "../components/BookCard/BookCard";
import { useState, useEffect } from "react";

import { NoResults } from "../components/Loaders/NoResults";
import { ThemeContext } from "../contexts/ThemeProvider";
import { SearchContext } from "../contexts/SearchProvider";
import { useContext } from "react";
import { useParams } from "react-router";
import { atServiceEndpoint, getData } from "../utils/serverFetchUtils";
import DefaultLoadingScreen from "../components/Loaders/DefaultLoadingScreen";

export function SearchPage() {
  const [books, setBooks] = useState([]);
  const { themeData: theme } = useContext(ThemeContext);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { searchTerm: searchTerm } = useContext(SearchContext);

  useEffect(() => {
    if (searchTerm == "" || !searchTerm) {
      setNoResults(true);
      setDataLoaded(true);
      return;
    }

    getData(atServiceEndpoint("search", "/search"), { q: searchTerm }).then(
      (response) => {
        if (response.length != 0) {
          setBooks(response);
        } else {
          // if response.length == 0, there are no matches for the search term
          setBooks([]);
          setNoResults(true);
        }
        setDataLoaded(true);
      }
    );
  }, [searchTerm]);

  if (!dataLoaded) {
    return <DefaultLoadingScreen />;
  }

  return (
    <div className="mx-7 mb-20">
      <main>
        <header className={`ml-10 ${theme.dark ? "mt-16" : "mt-12"} bigheader`}>
          <h1
            className={`text-5xl ${
              theme.dark
                ? "tracking-wider text-white"
                : "tracking-wide text-gray-900 font-semibold"
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
            <span
              className={`${
                theme.dark ? "text-white" : "text-gray-900 font-semibold"
              }`}
              style={{ fontWeight: theme.dark ? "200" : "600" }}
            >
              {searchTerm}
            </span>
          </h2>
        </header>

        {noResults ? <NoResults notFoundText="Sorry, we couldn't find anything for that." /> : (
          <section className="mt-14">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-14 flex-wrap ml-10 mt-8 mr-10">
              {books.map((book) => (
                <BookCard
                  bookTitle={book.title}
                  author={book.author}
                  nstars={book.nstars}
                  olid={book.olid}
                  isbn13={book.isbn13}
                  key={book.olid}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
