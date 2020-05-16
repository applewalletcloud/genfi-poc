// import puppeteer
const puppeteer = require('puppeteer');

test('canLoginWithGoogle?', async () => {

  // create a new browser instance
  // for some reason, when a pop up is involved, we should have headless: false
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: false});

  // create a page in the browser
  const page = await browser.newPage();

  // visit our login page
  await page.goto('https://localhost:3000/login/');

  // wait for our button to load and keep a reference to it
  await page.waitForSelector('button[id="google-login-button"]');
  const googleLoginButton = await page.$('#google-login-button');

  // create a promise to catch the popup in the variable
  const newPagePromise = new Promise((x) => page.once('popup', x));
  await page.click('button[id="google-login-button"]');
  await googleLoginButton.click();
  const popup = await newPagePromise;

  // fill in user login info
  await popup.waitForSelector('input[name=identifier]');
  await popup.type('input[name=identifier]', 'poc.forum.testuser@gmail.com');
  await popup.keyboard.press('Enter');
  await popup.waitForSelector('input[name=password]');
  await popup.waitFor(1500);
  await popup.type('input[name=password]', 'fakePassword!11');
  await popup.keyboard.press('Enter');

  // see if the webpage is on the same page after we enter credentials to login with google
  await page.waitForNavigation();
  expect(page.url()).toEqual('https://localhost:3000/forum');
  await page.close();
  await browser.close();
}, 20000);

test('canLoginWithFB?', async () => {

  // create a new browser instance
  // for some reason, when a pop up is involved, we should have headless: false
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: false});

  // create a page in the browser
  const page = await browser.newPage();

  // visit our login page
  await page.goto('https://localhost:3000/login/');

  // wait for our button to load and keep a reference to it
  await page.waitForSelector('button[id="facebook-login-button"]');

  // create a promise to catch the popup in the variable
  const newPagePromise = new Promise((x) => page.once('popup', x));
  await page.click('button[id="facebook-login-button"]');
  const popup = await newPagePromise;

  // fill in user login info
  await popup.waitForSelector('input[id=email]');
  // note that you'll need to fill our own fake credentials here!
  await popup.type('input[id=email]', 'qntvpafhpm_1588875079@tfbnw.net ');
  await popup.type('input[id=pass]', 'harryPassword1');
  await popup.keyboard.press('Enter');

  // see if the webpage is on the same page after we enter credentials to login with google
  await page.waitForNavigation();
  expect(page.url()).toEqual('https://localhost:3000/forum');
  await page.close();
  await browser.close();
}, 20000);
