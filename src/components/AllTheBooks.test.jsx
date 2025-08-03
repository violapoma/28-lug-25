import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AllTheBooks from "./AllTheBooks";
import { SearchProvider } from "../context/searchContext";
import { MemoryRouter } from "react-router";
import { SelectedProvider } from "../context/selectedContext";

it("renders the correct number of cards for each category", async () => {
  //mock della fetch
  global.fetch = vi.fn(() =>
    //simula la fetch; vi.fn crea una funzione finta tracciabile da vitest
    Promise.resolve({
      //risposta della fetch
      ok: true, //simula che sia andato tutto bene
      json: () =>
        //simula il metodo .json()
        Promise.resolve(
          Array.from({ length: 20 }, (_, i) => ({ // ** modifica qui la length per vari test
            //da me ci sono max 21 card -> ne restituisco 20
            asin: `${i + 1}`,
            title: `Book ${i + 1}`,
            img: "https://placehold.co/100x150",
            price: 10,
          }))
        ),
    })
  );

  render(
    <MemoryRouter>
      <SearchProvider>
        <SelectedProvider>
          <AllTheBooks />
        </SelectedProvider>
      </SearchProvider>
    </MemoryRouter>
  );

  const bookcards = await screen.findAllByTestId("bookCard");
  expect(bookcards.length).toBeLessThan(22); //metto massimo 21 card nella pagina //** modifica qui la length per vari test
});
