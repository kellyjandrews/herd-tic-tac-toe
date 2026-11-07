import { expect, test } from "@playwright/test";

test("two players can complete a game", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /make your next move/i })).toBeVisible();

  await page.getByRole("button", { name: "2 players" }).click();
  await page.getByRole("button", { name: "Square 1, empty" }).click();
  await page.getByRole("button", { name: "Square 4, empty" }).click();
  await page.getByRole("button", { name: "Square 2, empty" }).click();
  await page.getByRole("button", { name: "Square 5, empty" }).click();
  await page.getByRole("button", { name: "Square 3, empty" }).click();

  await expect(page.getByText("X wins!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Square 6, empty" })).toBeDisabled();
});

test("the computer responds to a player's move", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Square 5, empty" }).click();

  await expect(page.getByRole("button", { name: "Square 5, X" })).toBeVisible();
  await expect(page.getByRole("button", { name: /, O$/ })).toHaveCount(1);
  await expect(page.getByText("Your turn")).toBeVisible();
});

test("health endpoint is ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({ status: "ok" });
});
