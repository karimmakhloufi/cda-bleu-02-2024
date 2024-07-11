import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../pages/Home";
import { GET_ALL_ADS } from "../graphql/queries";

const adMock = {
  delay: 30,
  request: {
    query: GET_ALL_ADS,
  },
  result: {
    data: {
      getAllAds: [
        {
          id: 1,
          imgUrl: "",
          price: 12,
          title: "Boat to sell",
          ville: "Paris",
          description: "My boat is beautiful",
          owner: {
            email: "boatseller@gmail.com",
          },
        },
      ],
    },
  },
};

test("displays Loading", async () => {
  render(
    <MockedProvider mocks={[adMock]} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});

test("displays ads", async () => {
  render(
    <MockedProvider mocks={[adMock]} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  expect(await screen.findByText("Boat to sell")).toBeInTheDocument();
});
