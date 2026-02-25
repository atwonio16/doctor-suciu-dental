// filename: browser-agent.js
import { chromium } from 'playwright';

async function main() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    
    // Poți controla browserul
    await page.fill('input[name="q"]', 'Kimi AI MCP');
    await page.press('input[name="q"]', 'Enter');
}

main();