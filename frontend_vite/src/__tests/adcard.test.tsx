import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AdCard from "../components/AdCard";

test("loads and displays greeting", () => {
  render(<AdCard imgUrl="" link="" price={10} title="Bike to sell" />);

  const adTitle = screen.getByText("Bike to sell");
  expect(adTitle).not.toBeNull();
});
