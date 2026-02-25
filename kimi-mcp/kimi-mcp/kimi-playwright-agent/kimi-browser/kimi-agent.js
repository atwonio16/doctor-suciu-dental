const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Deschide Google
    await page.goto('https://google.com');

    // Caută "Kimi AI"
    await page.fill('input[name="q"]', 'Kimi AI');
    await page.press('input[name="q"]', 'Enter');

    // Poți adăuga mai multe comenzi aici
    // await page.goto('https://alt-site.com');
})();
