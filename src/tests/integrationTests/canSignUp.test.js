// TODO: AUTOMATED NOT YET FINISHED. Only checks that using a previously used user info doesn't work.
// Though, non-automated testing supports the argument that users can sign up
const puppeteer = require('puppeteer');
test('cannot sign up with already taken user info?', async () => {
  // create a new browser instance
  // the headless option makes it so that chrome will show what is happening as puppeteer is performing its operations
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: true});
  // create a page in the browser
  const page = await browser.newPage();
  // visit our login page
  await page.goto('https://localhost:3000/signup/');
  await page.type('#register_userName', 'testUser');
  await page.type('#register_email', 'testUser@gmail.com');
  await page.type('#register_password', 'testUserPassword');
  await page.type('#register_confirm', 'testUserPassword');
  await page.keyboard.press('Enter');
  expect(page.url()).toEqual('https://localhost:3000/signup/');
  await browser.close();
}, 10000);