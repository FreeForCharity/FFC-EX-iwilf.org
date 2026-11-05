import { test, expect } from '@playwright/test'
import { donateUrl } from '../src/data/landing'

test.describe('IWILF landing page', () => {
  test('the hero Our Mission button scrolls to the mission section', async ({ page }) => {
    await page.goto('/')
    await page.locator('#hero').getByRole('link', { name: 'Our Mission' }).click()
    await expect(page.locator('#mission')).toBeInViewport()
  })

  test('every Donate button points at the Zeffy form', async ({ page }) => {
    await page.goto('/')
    const donateLinks = page.locator(`a[href="${donateUrl}"]`)

    // Header, hero, support section and the footer quick link.
    await expect(donateLinks).toHaveCount(4)
    for (const link of await donateLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })
})
