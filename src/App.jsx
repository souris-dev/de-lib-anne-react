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
        <Route path="/" element={<LandingPage />} />
        <Route path="books" element={<WithNavbarAndFooter />}>
          <Route path=":bookId" element={<BookDescPage />} /> {/* ISBN13 */}
          <Route path="search" element={<Outlet />}>
            <Route path=":searchTerm" element={<SearchPage />} />
          </Route>
          <Route path="mywishlist" element={<WishlistPage />} />
          {/*Explore page: */}
          <Route index element={<ExplorePage />} />
        </Route>
        <Route path="signin" element={<SignInPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="*" element={<div className="text-white">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
