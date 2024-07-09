import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
  await page.goto("http://apigateway/");

  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Annonces récentes")).toBeVisible();
});
