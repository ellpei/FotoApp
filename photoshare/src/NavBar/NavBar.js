import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import menuimg from "./menu.svg";
import backimg from "./back.svg";

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    //this.props.history.goBack();
    this.props.prev.goBack();
  }

  render() {

    var backbtn = this.props.title != "Home" ?
    <div id="back-btn" width="20">
      <img src={backimg} width="20" alt="Back" onClick={this.goBack}/>
    </div>
    : null;

    return (
      <div className="NavBar">
        <div id="back-btn-container">{backbtn}</div>

        {this.props.title == "Home" ?
          (<div id="appname-container-left">
              <Link to="/Home">
                <div id="appname">PhotoShare</div>
              </Link>
            </div>) :
            (<div id="appname-container">
              <Link to="/Home">
                <div id="appname">PhotoShare</div>
              </Link>
            </div>)}

        <div id="menu-btn"><img src={menuimg} alt="Menu"/></div>
      </div>
    );
  }
}

export default NavBar;
