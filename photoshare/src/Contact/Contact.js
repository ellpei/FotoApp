import React, { Component } from "react";
import "../index.css";
import "./Contact.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";


class Contact extends Component {

  render() {
    return(
      <div className="Contact">
        <NavBar title="Contact" prev={this.props.history}></NavBar>
        <h2>Contact Us</h2>
        <div className = "textbox">
        <br/><br/>
        If you have any questions regarding the usage of the app or your user account, please do not hesitate to contact us.
        <br/>
        <br/>
        For inquiries regarding Photoshare, please contact pornell@kth.se
        </div>
      </div>
    );
  }
}

export default Contact;
