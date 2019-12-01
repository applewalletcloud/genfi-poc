import React from 'react';
//import './LoginButton.css';
import Button from '../node_modules/react-bootstrap/Button';



function LoginButton(props) {
  return (
    <Button className="LoginButton" variant="outline-primary">{props.text}</Button>
  );
}

export default LoginButton;