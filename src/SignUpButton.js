import React from 'react';
import './SignUpButton.css';
import Button from '../node_modules/react-bootstrap/Button';



function LoginButton(props) {
  return (
      <Button className="SignUpButton" variant="outline-primary">{props.text}</Button>
  );
}

export default LoginButton;