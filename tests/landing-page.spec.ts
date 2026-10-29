import { test, expect } from '@playwright/test'
import { donateUrl, navLinks } from '../src/data/landing'

test.describe('IWILF landing page', () => {
  test('header links scroll to sections that exist', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main' })

    for (const link of navLinks) {
      await nav.getByRole('link', { name: link.label }).click()
      await expect(page.locator(link.href)).toBeInViewport()
    }
  })

  test('every Donate button points at the Zeffy form', async ({ page }) => {
    await page.goto('/')
    const donateLinks = page.locator(`a[href="${donateUrl}"]`)

    // Three landing-page buttons plus the footer's Donate quick link, which
    // reads the same campaign from siteConfig.donationUrl.
    await expect(donateLinks).toHaveCount(4)
    await expect(page.locator(`footer a[href="${donateUrl}"]`)).toHaveCount(1)
    for (const link of await donateLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })
})
