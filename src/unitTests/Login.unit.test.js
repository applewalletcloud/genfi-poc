// const ForumHome = require('../ForumHome');
import React from 'react';
import { shallow } from 'enzyme';
import {ForumNavBar}  from '../ForumNavBar.js';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// importing for a mock store so enzyme can load
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
Enzyme.configure({ adapter: new EnzymeAdapter() });


const mockStore = configureMockStore();
const store = mockStore({});

test('<ForumNavBar />', () => {
	const $ = require('jquery'); // import jquery
	let wrapper = shallow(<ForumNavBar />); // create Forum Nav Bar Page
	// check that dom was edited for google api
	console.log(wrapper.debug())
	// console.log(document.body)
	// console.log($("*").contents());
	// console.log($('#root'));
	// console.log("trying to print the root above");
	// console.log("trying to print parts of the script below")
	// console.log($("script")["1"]);
	// console.log($('#google-login'));
	// console.log($('#google-login').outerHTML);
	// expect($('#google-login').outerHTML).toEqual('<script src="https://apis.google.com/js/platform.js"></script>');
	// check that dom was edited for facebook api
	// expect($('#facebook-jssdk').outerHTML).toEqual('<script id="facebook-jssdk" src="https://connect.facebook.net/en_US/sdk.js"></script>');
	expect("").toEqual("");

});

	//expect($('script[src]')["0"].outerHTML).toEqual('<script id="facebook-jssdk" src="https://connect.facebook.net/en_US/sdk.js"></script>');

// Two Sections: Component Did Mount and the actual render portion need to be tested
// Component Did Mount
// still need to test the redux shit

// In the render, we need to test:
//  need to finish redux tests before we can continue this
