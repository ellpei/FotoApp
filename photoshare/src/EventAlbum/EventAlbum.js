import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./EventAlbum.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js';

class EventAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
  
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(){
    //if(message = "URLSET"){
      this.setState({
        status: "LOADED"
      })
    //}
  }

  render() {

    let pictures = [];

    switch(this.state.status){
      case "LOADING":
        pictures = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        break;

      default:
        break;
    }


    return (
      <div className="EventAlbum">
        <NavBar title="EventAlbum" prev={this.props.history}></NavBar>
        <h2>EventAlbum</h2>
        {pictures}

      </div>
    );
  }
}

export default EventAlbum;
