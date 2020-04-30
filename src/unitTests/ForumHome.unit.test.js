const ForumHome = require('../ForumHome');

test('the google api loads', () => {
	const response = ForumHome.loadGoogleApi();
	print(response);
 	expect(response.toBe(""));
});

