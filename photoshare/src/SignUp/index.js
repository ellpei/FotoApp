import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase.js";

import SignUp from "./SignUp";

class SignUpContainer extends Component {  
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");

    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUp onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);