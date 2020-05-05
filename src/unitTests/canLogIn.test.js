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
	// const source = await page.content();
	// id is normal_login_username and normal_login_password
	await page.type('#normal_login_username', 'testUser');
	await page.type('#normal_login_password', 'testUserPass1word');
	const navigationPromise = page.waitForNavigation(); // this made us wait too long for some reason
	await page.keyboard.press('Enter');
	await navigationPromise;
	// get cookies and see if the user is who we expect it to be
	// const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
	
	let token = await page.evaluate(() => {
			
			//-----------------
			console.log("first call below");
			console.log(localStorage);
			localStorage.setItem("fuck this", "can i fucking see this?");
			console.log(localStorage.getItem("fuck this"));
			console.log(localStorage.getItem("token"));
			return JSON.stringify(localStorage);
		}
	);
	console.log("try to print it from the browser!");
	console.log("second call below");
	console.log(window.localStorage);
	console.log(token);
	console.log(JSON.parse(token));
	console.log("LET'S SEE IF THE TOKEN MATCHES WHAT WE WERE SEEING ABOVE!");
	console.log("WHY DON'T I SEE THESE PRINT STATEMENTS ANYWHERE?!");
	console.log(token);
	expect(JSON.parse(token)).toEqual("");
	await browser.close();
	

}, 10000);