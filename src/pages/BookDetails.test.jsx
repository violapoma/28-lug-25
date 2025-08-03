import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BookDetails from "./BookDetails";
import { MemoryRouter, Route, Routes } from "react-router";
import { SearchProvider } from "../context/searchContext";
import { SelectedProvider } from "../context/selectedContext";
import { TokenContext } from "../context/tokenContext";
import CommentArea from "../components/CommentArea";
import { HandleCommentProvider } from "../context/handleCommentContext";

describe("CommentArea is being tested", () => {
  it("renders CommentArea in BookDetails", async () => {
    render(
      <MemoryRouter initialEntries={["/books/0316438960"]}>
        <SearchProvider>
          <SelectedProvider>
            <TokenContext>
              <BookDetails />
            </TokenContext>
          </SelectedProvider>
        </SearchProvider>
      </MemoryRouter>
    );
    const commentAreaText = await screen.findByText(/leave a comment/i);
    expect(commentAreaText).toBeInTheDocument();
  });

  it("renders comment list inside CommentArea", async () => {
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: "1",
              comment: "First comment",
              rate: 4,
              elementId: "0316438960",
            },
            {
              _id: "2",
              comment: "Second comment",
              rate: 5,
              elementId: "0316438960",
            },
          ]),
      })
    );
  
    render(
      <MemoryRouter initialEntries={["/books/0316438960"]}>
        <SearchProvider>
          <SelectedProvider>
            <TokenContext>
              <HandleCommentProvider>
                {/* qui uso Routes + Route altrimenti useParams non funziona >.>'' */}
                <Routes> 
                  <Route path="/books/:asin" element={<CommentArea />} />
                </Routes>
              </HandleCommentProvider>
            </TokenContext>
          </SelectedProvider>
        </SearchProvider>
      </MemoryRouter>
    );
  
    const comments = await screen.findAllByTestId("singleComment");
  
    expect(comments.length).toBe(2); //ne sto ritornando due con la finta fetch
  });
});
