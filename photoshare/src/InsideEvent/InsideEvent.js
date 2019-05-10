import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InsideEvent.css";
import 'bootstrap/dist/css/bootstrap.css';

class InsideEvent extends Component {


  render() {
    return (
      <div className="InsideEvent">
        <p>InsideEvent</p>
        <Link to="./Camera">
          <button>Camera</button>
        </Link>
      </div>
    );
  }
}

export default InsideEvent;
