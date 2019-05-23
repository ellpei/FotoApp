import React, { Component } from "react";

import { Link } from "react-router-dom";
import "../index.css";
import "./PhotoView.css";
import NavBar from "../NavBar/NavBar.js";
import DisplayEvent from "../DisplayEvent/DisplayEvent.js";
import modelInstance from '../data/Model.js';
//import firebase from '../firebase.js';
import * as firebase from 'firebase';

class PhotoView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      URL: null,
      status: "LOADING"
    };
  }
  //called automatically when the DOM is shown to the user
  componentDidMount(){
    modelInstance.addObserver(this);
    this.getData();
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }


  update(){
    var url = modelInstance.getPhotoViewPic();
    console.log(url);
    //if(message = "URLSET"){
      this.setState({
        URL: url,
        status: "LOADED"
      })
    //}
  }


  getData(){
    let eventID = window.location.href.split("/");
    // console.log(decodeURIComponent(eventID[4]));
    modelInstance.getOnePicture(modelInstance, decodeURIComponent(eventID[4]));
   }


  render() {

    let picture = null;

    switch(this.state.status){
      case "LOADING":
        picture = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        picture = 
          <div>
            <img src={this.state.URL}></img>  
          </div>
        break;

      default:
        break;
    }




    return (
      <div className="PhotoView">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Photo View</h2>
        <div>
          {picture}
        </div>


      </div>
    );
  }
}

export default PhotoView;
