// const ForumHome = require('../ForumHome');
import React from 'react';
import { shallow } from 'enzyme';
import { ForumHome } from '../ForumHome.js';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });



test('<ForumHome />', () => {
	const $ = require('jquery'); // import jquery
	let wrapper = shallow(<ForumHome />); // create forum home
	// check that dom was edited for google api
	console.log($('script[src]'))
	//expect($('script[src]')["1"].outerHTML).toEqual('<script src="https://apis.google.com/js/platform.js"></script>');
	// check that dom was edited for facebook api
	//expect($('script[src]')["0"].outerHTML).toEqual('<script id="facebook-jssdk" src="https://connect.facebook.net/en_US/sdk.js"></script>');
	expect("").toEqual("");
	
});


// Two Sections: Component Did Mount and the actual render portion need to be tested
// Component Did Mount
// still need to test the redux shit

// In the render, we need to test:
//  need to finish redux tests before we can continue this
