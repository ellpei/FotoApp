import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "../index.css";
import "./NavBar.css";
import menuimg from "./menu.svg";
import backimg from "./back.svg";
import closeimg from "./delete.svg";
import 'bootstrap/dist/css/bootstrap.css';


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
  openNav = ()  => {
    document.getElementById("mySidenav").style.width = "250px";
    this.setState({
      menuVisible: true
    });

  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    this.setState({
      menuVisible: false
    });
  }

  logOut = () => {
    alert("Are you sure you want to log out?")
  }


  render() {

    var backbtn = this.props.title !== "Home" ?
    <div id="back-btn" width="20">
      <img src={backimg} width="20" alt="Back" onClick={this.goBack}/>
    </div>
    : null;

    return (
      <div className="NavBar">
      <div id="mySidenav" className="sidenav">
        <Link to="/Home">Home</Link><br/>
        <Link to="/About">About</Link><br/>
        <Link to="/Contact">Contact</Link><br/>
        <Link to="/">Log out</Link>
      </div>
      <div id="back-btn-container">{backbtn}</div>

      {this.props.title === "Home" ?
        (<div id="appname-container-left">
            <Link to="/Home">
              PhotoShare
            </Link>
          </div>) :
          (<div id="appname-container">
            <Link to="/Home">
              PhotoShare
            </Link>
          </div>)}

      {this.state.menuVisible ?
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}><img src={closeimg} alt="Close" width="30px"/></a>
        : <div id="menu-btn" onClick={this.openNav}><img src={menuimg} alt="Menu" width="30px"/></div>}
      </div>
    );
  }
}

export default NavBar;
