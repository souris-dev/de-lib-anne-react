import { Outlet, BrowserRouter, Route, Routes } from "react-router-dom";
import BookDescPage from "./pages/BookDescPage";
import { WithNavbarAndFooter } from "./pages/WithNavbarAndFooter";
import { WishlistPage } from "./pages/WishlistPage";
import { SignUpPage } from "./pages/SignUp";
import { SignInPage } from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Lol</div>} />
        <Route path="books" element={<WithNavbarAndFooter />}>
          <Route path=":bookId" element={<BookDescPage />} />
          <Route path="search" element={<div>Search</div>} />
          <Route path="mywishlist" element={<WishlistPage />} />
          {/*Explore page: */}
          <Route index element={<div></div>} />
        </Route>
        <Route path="signin" element={<SignInPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="*" element={<div className="text-white">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
