import React, { Component } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import NavBar from "../NavBar/NavBar.js";
import "./Camera.css";
import 'bootstrap/dist/css/bootstrap.css';
import modelInstance from '../data/Model.js';

class Camera extends Component {

  state = {
    imageData: null,
    image_name: "",
    image_time: null,
    image_by: null,
    cam_height: 350,
    facing: "user"
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    var time = new Date().getTime();
    console.log(time);

    this.setState({
      imageData: imageSrc, 
      image_time: time, 
      image_by: "Jens", 
      image_event: modelInstance.getEventID(), 
      cam_height: 0
    })
  };

  deletePhoto = (e) => {
    e.persist();
    this.setState({
      imageData: null,
      cam_height: 350
    })
  };

  uploadPhoto = () => {
    const item = {
      image: this.state.imageData,
      name: this.state.image_name,
      time: this.state.image_time,
      by: this.state.image_by
    };

    modelInstance.uploadPhoto(item);
  };

  facingToggle = () => {
    alert("switching camera")
    if(this.state.facing == "user") {
      this.setState({
        facing: 'environment'
      })
    } else {
      this.setState({
        facing: 'user'
      })
    }
  }

  render() {
    const videoConstraints = {
      facingMode: "user"
    };
    

//    Philppa ska på ADD Dejt awww 2019-05-20

    let imageCanvas = <Webcam ref={this.setRef}/>;
    let capturedPic = <img src={this.state.imageData} alt=""/>;

    return (
      <div className="Camera">
        <NavBar title="Camera" prev={this.props.history}></NavBar>
        <div className="camera-container">
        <div>
          <Webcam
            audio ={false}
            height={this.state.cam_height}
            ref={this.setRef}
            getScreenshot="image/jpeg"
            width={350}
            videoConstraints = {videoConstraints}
          />
          {this.state.imageData ?
            <div>
              <img src={this.state.imageData} alt=""/>
            </div>
            : null}
        </div>


          <div className="btn-container">
            <button id="captureBtn" onClick={this.capture}>Capture photo</button>
            <button id="deleteBtn" onClick={this.deletePhoto}>Delete photo</button>
            <button id="uploadBtn" onClick={this.uploadPhoto}>Upload</button>
            <button id="switch" onClick={this.facingToggle}>Switch camera</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Camera;
