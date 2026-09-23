import puppeteer from 'puppeteer-core';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  // Desktop viewport so the phone chrome is fully visible and media-query
  // mobile stretch layout is not required for shots.
  defaultViewport: { width: 1280, height: 960, deviceScaleFactor: 2 },
});

const page = await browser.newPage();

async function shot(name) {
  const frame = await page.$('.phone-frame');
  await frame.screenshot({ path: join(outDir, name) });
  console.log('wrote', name);
}

function clickText(text) {
  return page.evaluate((t) => {
    const buttons = [...document.querySelectorAll('button')];
    const el = buttons.find((b) => (b.textContent || '').trim().includes(t));
    if (!el) throw new Error('No button: ' + t);
    el.click();
  }, text);
}

await page.goto('http://127.0.0.1:4174/startbalance/', { waitUntil: 'networkidle0' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle0' });
await page.waitForSelector('.empty-hero', { timeout: 5000 });
await new Promise((r) => setTimeout(r, 300));
await shot('home-empty.png');

const now = new Date().toISOString();
await page.evaluate((nowIso) => {
  const state = {
    remaining: 42.5,
    lastCheckedAt: nowIso,
    periodStartedAt: nowIso,
    entries: [
      { id: '1', type: 'spend', amount: 8.4, merchant: 'Tesco Express', date: '2026-09-22', createdAt: nowIso },
      { id: '2', type: 'spend', amount: 12.15, merchant: 'Asda', date: '2026-09-21', createdAt: nowIso },
      { id: '3', type: 'spend', amount: 3.2, merchant: 'Corner fruit shop', date: '2026-09-20', createdAt: nowIso },
      { id: '4', type: 'topup', amount: 34, date: '2026-09-09', createdAt: nowIso, note: 'Top-up / new balance entered' },
      { id: '5', type: 'period_start', amount: 66.25, date: '2026-09-09', createdAt: nowIso, note: 'Starting balance (demo)' },
    ],
  };
  localStorage.setItem('startbalance-v1', JSON.stringify(state));
}, now);
await page.reload({ waitUntil: 'networkidle0' });
await page.waitForSelector('.balance-amount', { timeout: 5000 });
await new Promise((r) => setTimeout(r, 400));
await shot('home.png');

await clickText('Log a spend');
await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
await new Promise((r) => setTimeout(r, 350));
await shot('add-spend.png');

await clickText('Cancel');
await new Promise((r) => setTimeout(r, 250));

await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('.tab-btn')];
  tabs[1]?.click();
});
await page.waitForSelector('.tx-list, .empty-state', { timeout: 5000 });
await new Promise((r) => setTimeout(r, 350));
await shot('activity.png');

await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('.tab-btn')];
  tabs[2]?.click();
});
await new Promise((r) => setTimeout(r, 300));
await shot('card.png');

await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('.tab-btn')];
  tabs[3]?.click();
});
await new Promise((r) => setTimeout(r, 300));
await shot('help.png');

await browser.close();
console.log('done');
