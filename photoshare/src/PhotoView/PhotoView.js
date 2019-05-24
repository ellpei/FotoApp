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
      takenTime: null,
      takenBy: null,
      eventName: null,
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
    var eventName = modelInstance.getCurrentEvent();
    var takenTime = new Date(parseInt(window.location.href.split("###")[1])).toLocaleString();

    //if(message = "URLSET"){
      this.setState({
        URL: url,
        takenTime: takenTime,
        eventName: eventName,
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
    let pictureInfo = null;

    switch(this.state.status){
      case "LOADING":
        picture = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        pictureInfo = 
          <div>
            <h4>Taken By: Admin</h4>
            <h4>Event: {this.state.eventName}</h4>
            <h4>Taken Time: {this.state.takenTime}</h4>
          </div>
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
        <NavBar title="PhotoView" prev={this.props.history}></NavBar>
        <h2>Photo View</h2>
        <div>
          {picture}
        </div>
        <div>
          {pictureInfo}
        </div>


      </div>
    );
  }
}

export default PhotoView;
