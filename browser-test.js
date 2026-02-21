const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  page.on('console', msg => console.log('Browser:', msg.text()));

  await page.goto('http://localhost:3000');

  await page.waitForFunction(() => {
    return document.body.innerText.includes('Service Worker ready');
  }, { timeout: 5000 });

  console.log('✓ Service Worker registered and ready');

  await page.click('#testBtn');

  await page.waitForFunction(() => {
    return document.body.innerText.includes('Hello, this is a test message!');
  }, { timeout: 5000 });

  const result = await page.evaluate(() => document.getElementById('result').innerText);

  console.log('\n=== Test Results ===');
  console.log(result);

  if (result.includes('Hello, this is a test message!')) {
    console.log('\n✓ SUCCESS: Service Worker correctly decrypted the response!');
  } else {
    console.log('\n✗ FAILED: Decryption did not work');
  }

  await browser.close();
  process.exit(0);
})();
