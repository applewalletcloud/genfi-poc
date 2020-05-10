// import puppeteer
const puppeteer = require('puppeteer');

test('canLogin?', async () => {

  // create a new browser instance
  // the headless option makes it so that chrome will show what is
  // happening as puppeteer is performing its operations
  const browser = await puppeteer.launch({ headless: true });

  // create a page in the browser
  const page = await browser.newPage();

  // visit our login page
  await page.goto('https://localhost:3000/login/');

  // id is normal_login_username and normal_login_password
  await page.type('#normal_login_username', 'testUser');
  await page.type('#normal_login_password', 'testUserPassword');
  const navigationPromise = page.waitForNavigation();
  await page.keyboard.press('Enter');
  await navigationPromise;

  // see if the webpage is on the same page
  // we check by checking url instead of checking local storage
  // because we were unable to port the local storage out using this library.
  expect(page.url()).toEqual('https://localhost:3000/forum');
  await browser.close();
}, 10000);


test('cannot login with invalid info?', async () => {
  const browser = await puppeteer.launch({ headless: true });

  // create a page in the browser
  const page = await browser.newPage();

  // revisit the login page and try to login with fake user credentials
  await page.goto('https://localhost:3000/login/');
  await page.type('#normal_login_username', 'testUser');
  await page.type('#normal_login_password', 'testUser1Password');
  await page.keyboard.press('Enter');

  // see if the webpage is on the same page
  expect(page.url()).toEqual('https://localhost:3000/login/');
  await browser.close();
}, 10000);
