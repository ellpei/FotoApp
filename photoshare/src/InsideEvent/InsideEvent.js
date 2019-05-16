import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InsideEvent.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";

class InsideEvent extends Component {

  render() {
    return (
      <div className="InsideEvent">
        <NavBar title="InsideEvent" prev={this.props.history}></NavBar>

        <Link to="./Camera">
          <button>Camera</button>
        </Link>
      </div>
    );
  }
}

export default InsideEvent;
