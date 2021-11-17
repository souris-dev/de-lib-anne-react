import { Outlet, BrowserRouter, Route, Routes } from "react-router-dom";
import BookDescPage from "./pages/BookDescPage";
import { WithNavbarAndFooter } from "./pages/WithNavbarAndFooter";
import { WishlistPage } from "./pages/WishlistPage";
import { SignUpPage } from "./pages/SignUp";
import { SignInPage } from "./pages/SignIn";
import { ExplorePage } from "./pages/Explore";
import { SearchPage } from "./pages/SearchPage";
import LandingPage from "./pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact strict path="/" element={<LandingPage />} />
        <Route exact strict path="books" element={<WithNavbarAndFooter />}>
          <Route exact strict path=":bookId" element={<BookDescPage />} /> {/* ISBN13 */}
          <Route exact strict path="search" element={<Outlet />}>
            <Route exact strict path=":searchTerm" element={<SearchPage />} />
          </Route>
          <Route exact strict path="mywishlist" element={<WishlistPage />} />
          {/*Explore page: */}
          <Route index element={<ExplorePage />} />
        </Route>
        <Route exact strict path="signin" element={<SignInPage />} />
        <Route exact strict path="register" element={<SignUpPage />} />
        <Route path="*" element={<div className="text-white">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
