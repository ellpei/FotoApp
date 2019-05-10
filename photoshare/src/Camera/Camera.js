import React, { Component } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import "./Camera.css";
import 'bootstrap/dist/css/bootstrap.css';

class Camera extends Component {

  state = {
    imageData: null,
    image_name: "",
    cam_height: 350,
    facing: "user"
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageData: imageSrc,
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
    alert("upload");
    console.log("up");
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

    let imageCanvas = <Webcam ref={this.setRef}/>;
    let capturedPic = <img src={this.state.imageData} alt=""/>;

    return (
      <div className="Camera">
        <p>InsideEvent</p>
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
