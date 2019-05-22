import React, { Component } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import NavBar from "../NavBar/NavBar.js";
import "./Camera.css";
import 'bootstrap/dist/css/bootstrap.css';
import modelInstance from '../data/Model.js';
import camerashutter from './camerashutter.svg';
import cancelbutton from './cancelbtn.svg';
import uploadbtn from './uploadbtn.png';

class Camera extends Component {

  state = {
    imageData: null,
    image_name: "",
    image_time: null,
    image_by: null,
    cam_height: window.innerHeight*0.8,
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
      cam_height: window.innerHeight*0.8
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
      facingMode: "user",
      width: window.innerWidth,
      height: window.innerHeight
    };


//    Philppa ska på ADD Dejt awww 2019-05-20

    let imageCanvas = <Webcam ref={this.setRef}/>;
    let capturedPic = <img src={this.state.imageData} alt=""/>;
    return (
      <div className="Camera">
        <NavBar title="Camera" prev={this.props.history}></NavBar>
        <div className="camera-container">
          <Webcam
            audio ={false}
            height={this.state.cam_height}
            ref={this.setRef}
            getScreenshot="image/jpeg"
            width={window.innerWidth*0.9}
            videoConstraints = {videoConstraints}/>
          {this.state.imageData ?
            <div>
              <img src={this.state.imageData} alt="" width={window.innerWidth*0.6}/>
            </div>
            : null}
          <div className="btn-container">

          {
            this.state.imageData ?
            <div>
              <button id="deleteBtn" onClick={this.deletePhoto}>
              <img src={cancelbutton} width="48px" alt="Delete"/>
              </button>
              <button id="uploadBtn" onClick={this.uploadPhoto}><img src={uploadbtn} width="40px" alt="Upload"/></button>
            </div> :
            <button id="captureBtn" onClick={this.capture}><img src={camerashutter} width="40px" alt="Capture"/></button>
          }

            {/*<button id="switch" onClick={this.facingToggle}>Switch Camera</button>*/}
          </div>

        </div>
      </div>
    );
  }
}

export default Camera;
