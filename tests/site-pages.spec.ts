import { test, expect } from '@playwright/test'
import { navLinks } from '../src/data/landing'

test.describe('IWILF site pages', () => {
  test('header links open each page', async ({ page }) => {
    await page.goto('/')
    for (const link of navLinks) {
      await page
        .getByRole('navigation', { name: 'Main' })
        .getByRole('link', { name: link.label })
        .click()
      await expect(page).toHaveURL(new RegExp(`${link.href}/$`))
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(
        page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: link.label })
      ).toHaveAttribute('aria-current', 'page')
    }
  })

  for (const link of navLinks) {
    test(`${link.href}/ has no horizontal scroll on a phone`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 })
      const response = await page.goto(`${link.href}/`)
      expect(response?.status()).toBe(200)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})
