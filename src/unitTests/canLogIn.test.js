// import puppeteer
const puppeteer = require('puppeteer');

// this wrapper means immediately execute this code
test('canLogin?', async () => {
	// create a new browser instance
	// the headless option makes it so that chrome will show what is happening as puppeteer is performing its operations
	const browser = await puppeteer.launch({ headless: false });
	// create a page in the browser
	const page = await browser.newPage();
	// visit our login page
	await page.goto('https://localhost:3000/login/');

	// get the html and print it
	const source = await page.content();
	// console.log(source);
	// id is normal_login_username and normal_login_password
	await page.type('#normal_login_username', 'buhzam!');
	expect(source).toEqual("");

	await browser.close()

});