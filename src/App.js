import React, { Fragment } from 'react';
import './App.css';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';

function App() {
  return (
    <Fragment className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <Header />
      <Body />
      <Footer />
    </Fragment>
  );
}

function Test(){
  return (<></>)
}

export default App;
