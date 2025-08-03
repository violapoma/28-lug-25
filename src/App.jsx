import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import { SearchProvider } from "./context/searchContext";
import { SelectedProvider } from "./context/selectedContext";
import { BrowserRouter, Route, Routes } from "react-router";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TokenContext } from "./context/tokenContext";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 ">
        <SearchProvider>
          <MyNav />
          <SelectedProvider>
            <TokenContext>
              <div className="flex-grow-1 py-5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books/:asin" element={<BookDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </div>
            </TokenContext>
          </SelectedProvider>
        </SearchProvider>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
