import { test, expect } from '@playwright/test';

test.describe('Blackjack Simulator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blackjack Strategy Simulator/);
  });

  test('displays main heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Blackjack Strategy Simulator' }),
    ).toBeVisible();
  });

  test('betting strategy table has correct labels', async ({ page }) => {
    // Check for "True Count Range" header instead of old label
    await expect(page.getByText('True Count Range')).toBeVisible();

    // Check for "Wager ($)" header instead of "Bet Amount ($)"
    await expect(page.getByText('Wager ($)')).toBeVisible();

    // Check for "Delete?" header
    await expect(page.getByText('Delete?')).toBeVisible();
  });

  test('Add True Count Range button exists with correct label', async ({
    page,
  }) => {
    // Check that button says "Add True Count Range" not "Add Bet Tier"
    const addButton = page.getByRole('button', {
      name: 'Add True Count Range',
    });
    await expect(addButton).toBeVisible();
  });

  test('delete buttons are visible and red', async ({ page }) => {
    // Find all X buttons in the betting table
    const deleteButtons = page.locator('button:has-text("X")');
    const count = await deleteButtons.count();

    // Should have at least one delete button
    expect(count).toBeGreaterThan(0);

    // Check that first delete button has red color class
    const firstButton = deleteButtons.first();
    await expect(firstButton).toHaveClass(/text-red-500/);
  });

  test('Enable Hand-by-Hand Tracking checkbox controls tracking', async ({
    page,
  }) => {
    const checkbox = page.getByLabel(
      'Enable Hand-by-Hand Tracking (Limits to 1000 hands max)',
    );
    const runButton = page.getByRole('button', { name: 'Run Simulation' });

    // Initially unchecked
    await expect(checkbox).not.toBeChecked();

    // Run simulation without tracking
    await runButton.click();

    // Wait for simulation to complete (adjust timeout as needed)
    await page.waitForTimeout(3000);

    // Should not show hand details table
    const handDetailsTable = page.locator('text=Hand Details');
    await expect(handDetailsTable).not.toBeVisible();

    // Check the checkbox
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Run simulation with tracking
    await runButton.click();
    await page.waitForTimeout(3000);

    // Should show hand details table
    await expect(handDetailsTable).toBeVisible();
  });

  test('betting table inputs have correct sizes', async ({ page }) => {
    // Check that True Count Range inputs are small (w-14)
    const minCountInput = page.locator('input[id^="minCount-"]').first();
    await expect(minCountInput).toHaveClass(/w-14/);

    const maxCountInput = page.locator('input[id^="maxCount-"]').first();
    await expect(maxCountInput).toHaveClass(/w-14/);

    // Check that Wager input is small (w-16)
    const betAmountInput = page.locator('input[id^="betAmount-"]').first();
    await expect(betAmountInput).toHaveClass(/w-16/);
  });

  test('can add and remove betting tiers', async ({ page }) => {
    const addButton = page.getByRole('button', {
      name: 'Add True Count Range',
    });
    const deleteButtons = page.locator('button:has-text("X")');

    // Count initial rows
    const initialCount = await deleteButtons.count();

    // Add a new tier
    await addButton.click();

    // Should have one more delete button
    await expect(deleteButtons).toHaveCount(initialCount + 1);

    // Remove the last tier
    const lastDeleteButton = deleteButtons.last();
    await lastDeleteButton.click();

    // Should be back to initial count
    await expect(deleteButtons).toHaveCount(initialCount);
  });
});
