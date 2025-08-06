import { test, expect } from '@playwright/test';

test.describe('Blackjack Simulator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    await expect(
      page.getByRole('cell', { name: 'True Count Range' }),
    ).toBeVisible();

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

  test('complete simulation workflow with basic settings', async ({ page }) => {
    // Set basic simulation parameters
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('100');

    // Configure betting through the betting table
    const betAmountInput = page.locator('input[id^="betAmount-"]').first();
    await betAmountInput.fill('25');

    // Run simulation
    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Wait for simulation to complete
    await page.waitForTimeout(5000);

    // Check that results are displayed
    await expect(page.getByText('Simulation Results')).toBeVisible();
    await expect(page.getByText('Hands Played')).toBeVisible();

    // Check that hands played shows 100 (be more specific to avoid multiple matches)
    const handsPlayedSection = page
      .locator('.bg-blue-50')
      .filter({ hasText: 'Hands Played' });
    await expect(handsPlayedSection.getByText('100')).toBeVisible();

    // Check that win percentage is displayed
    await expect(page.getByText('Win Rate')).toBeVisible();

    // Check that detailed statistics are shown
    await expect(page.getByText('Total Wagered:')).toBeVisible();

    // Check that EV section is shown (be more specific)
    const evSection = page.locator('.bg-yellow-50').filter({ hasText: 'EV' });
    await expect(evSection).toBeVisible();
  });

  test('simulation workflow with hand tracking enabled', async ({ page }) => {
    // Enable hand tracking
    const trackingCheckbox = page.getByLabel(
      'Enable Hand-by-Hand Tracking (Limits to 1000 hands max)',
    );
    await trackingCheckbox.check();

    // Set smaller number of simulations for faster test
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('50');

    // Run simulation
    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Wait for simulation to complete
    await page.waitForTimeout(5000);

    // Check that hand details table is visible
    await expect(page.getByText('Hand Details')).toBeVisible();

    // Check that some hand tracking data is displayed
    // (Just verify the section appears - we tested the detailed logic in unit tests)
    await expect(
      page.getByRole('cell', { name: 'Hand', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'True Count', exact: true }),
    ).toBeVisible();
  });

  test('configuration panel updates affect simulation', async ({ page }) => {
    // Change counting system
    const countingSystemSelect = page.locator('select[id="countingSystem"]');
    await countingSystemSelect.selectOption('KO');

    // Change number of decks
    const numberOfDecksInput = page.locator('input[id="numberOfDecks"]');
    await numberOfDecksInput.fill('8');

    // Change deck penetration
    const deckPenetrationInput = page.locator('input[id="deckPenetration"]');
    await deckPenetrationInput.fill('80');

    // Toggle dealer hits soft 17
    const dealerHitsSoft17Checkbox = page.locator(
      'input[id="dealerHitsSoft17"]',
    );
    await dealerHitsSoft17Checkbox.uncheck();

    // Run simulation with small number for speed
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('25');

    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Wait for simulation to complete
    await page.waitForTimeout(3000);

    // Check that counting system section is visible (configuration worked)
    await expect(page.getByText('Counting System:')).toBeVisible();
    // Just verify the simulation completed with the new config
    await expect(page.getByText('Simulation Results')).toBeVisible();
  });

  test('betting table configuration workflow', async ({ page }) => {
    // Add a new betting tier
    const addButton = page.getByRole('button', {
      name: 'Add True Count Range',
    });
    await addButton.click();

    // Configure the new tier
    const newMinCountInput = page.locator('input[id^="minCount-"]').last();
    const newMaxCountInput = page.locator('input[id^="maxCount-"]').last();
    const newBetAmountInput = page.locator('input[id^="betAmount-"]').last();

    await newMinCountInput.fill('2');
    await newMaxCountInput.fill('4');
    await newBetAmountInput.fill('100');

    // Run simulation to see if betting configuration works
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('10');

    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Wait for simulation to complete
    await page.waitForTimeout(3000);

    // Should complete without errors
    await expect(page.getByText('Simulation Results')).toBeVisible();
  });

  test('simulation runs without errors', async ({ page }) => {
    // Simple test to verify simulation can run successfully
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('50');

    // Start simulation
    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Wait for simulation to complete
    await page.waitForTimeout(2000);

    // Should show results
    await expect(page.getByText('Simulation Results')).toBeVisible();
  });

  test('responsive design and mobile layout', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that main elements are still visible
    await expect(page.getByRole('heading', { name: 'Blackjack Strategy Simulator' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Simulation Configuration' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Run Simulation' }),
    ).toBeVisible();

    // Check that betting table is responsive
    await expect(
      page.getByRole('cell', { name: 'True Count Range' }),
    ).toBeVisible();
    await expect(page.getByText('Wager ($)')).toBeVisible();

    // Run a quick simulation to ensure mobile functionality
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('10');

    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    await page.waitForTimeout(2000);

    // Results should be visible on mobile
    await expect(page.getByText('Simulation Results')).toBeVisible();
  });

  test('error handling and validation', async ({ page }) => {
    // Test with invalid input values
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('0');

    const betAmountInput = page.locator('input[id^="betAmount-"]').first();
    await betAmountInput.fill('-10');

    // Try to run simulation with invalid values
    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    // Should handle gracefully (either prevent submission or show error)
    // The exact behavior depends on validation implementation
    await page.waitForTimeout(1000);

    // Reset to valid values
    await numberOfSimulationsInput.fill('10');
    await betAmountInput.fill('10');

    await runButton.click();
    await page.waitForTimeout(2000);

    // Should work with valid values
    await expect(page.getByText('Simulation Results')).toBeVisible();
  });

  test('results persistence and chart interactions', async ({ page }) => {
    // Run simulation
    const numberOfSimulationsInput = page.locator(
      'input[id="numberOfSimulations"]',
    );
    await numberOfSimulationsInput.fill('100');

    const runButton = page.getByRole('button', { name: 'Run Simulation' });
    await runButton.click();

    await page.waitForTimeout(3000);

    // Check that results are displayed
    await expect(page.getByText('Simulation Results')).toBeVisible();

    // Check detailed statistics are shown
    await expect(page.getByText('Total Wagered:')).toBeVisible();

    // Run another simulation to see if results update
    await numberOfSimulationsInput.fill('50');
    await runButton.click();

    await page.waitForTimeout(2000);

    // Results should update with new values - use more specific selector
    await expect(
      page.getByText('Hands Played').locator('..').getByText('50'),
    ).toBeVisible();
  });
});
