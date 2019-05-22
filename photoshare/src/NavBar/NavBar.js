import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import menuimg from "./menu.svg";
import backimg from "./back.svg";

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuVisible: false
    };
  }


  goBack = () => {
    //this.props.history.goBack();
    this.props.prev.goBack();
  }

  handleMenuClick = () => {
    if(this.state.menuVisible) {
      this.setState({
        menuVisible: false
      });
    } else {
      this.setState({
        menuVisible: true
      });
    }
  }

  render() {

    var backbtn = this.props.title !== "Home" ?
    <div id="back-btn" width="20">
      <img src={backimg} width="20" alt="Back" onClick={this.goBack}/>
    </div>
    : null;

    return (
      <div className="NavBar">
      <div id="top-nav">
        <div id="back-btn-container">{backbtn}</div>

        {this.props.title === "Home" ?
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

        <div id="menu-btn" onClick={this.handleMenuClick}><img src={menuimg} alt="Menu"/></div>
        </div>
        {this.state.menuVisible === true ?
          <div id="drop-down">
            <div class="link-container">
              <Link to="/Home">Home</Link><br/>
            </div>
            <div class="link-container">
              <Link to="/About">About</Link><br/>
            </div>
            <div class="link-container">
              <Link to="/Help">Help</Link><br/>
            </div>
          </div> : <div></div>}
      </div>
    );
  }
}

export default NavBar;
