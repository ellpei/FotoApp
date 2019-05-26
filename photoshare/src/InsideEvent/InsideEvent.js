import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InsideEvent.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js';
import camerashutter from './camerashutter.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class InsideEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: null,
      currentEventID: modelInstance.getCurrentEventID(),
      currentEventObject: modelInstance.getCurrentEventObject()
    };
  }


  componentDidMount(){
    modelInstance.addObserver(this);
    this.getData();
    // CALL METHODS
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(){
    //console.log("IN UPDATE IN InsideEvent!");
    console.log("InsideEvent Update!");
    var picturesList = modelInstance.getPictureURLs();
    //if(message = "URLSET"){
      this.setState({
        pictures: picturesList,
        status: "LOADED"
      })
    //}
  }

  getData(){
    console.log("InsideEvent - getData()");
    modelInstance.generatePictureCarousel(modelInstance);
  }

  render() {
    let carousel = null;
    let generateImageDiv = [];
    let currentEvent = null;
    let test = null;

    switch(this.state.status){
      case "LOADING":
        carousel = <div className="col-sm-12"><em>Loading...</em></div>
        test = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        //https://www.npmjs.com/package/react-responsive-carousel'

        for(var i = 0 ; i < this.state.pictures.length ; i++){
          generateImageDiv.push(
            <div key="i">
                <img  src={this.state.pictures[i]} alt={"Image " + i}></img>
            </div>
          )
        }

        test = 
          <div>
            <h2>Start: {modelInstance.getCurrentEventStartDate()} {modelInstance.getCurrentEventStartTime()}</h2>
            <h2>Description: {modelInstance.getCurrentEventDescription()}</h2>
          </div>

        currentEvent = modelInstance.getCurrentEvent()

        carousel =
          <Carousel id= "carousel"
            autoPlay = {true}
            infiniteLoop = {true}
            centerMode = {true}
            showThumbs = {false}
            showStatus = {false}
            showArrows = {false}>
            {generateImageDiv}
          </Carousel>
        break;

      default:
        break;
    }

    return (
      <div className="InsideEvent">
        <NavBar title="InsideEvent" prev={this.props.history}></NavBar>
        {/* <h3>{this.state.currentEventObject ? this.state.currentEventObject['name'] : null }</h3> */}
        <h2>{modelInstance.getCurrentEvent()}</h2>
        <div id="carouselWrapper">
          {carousel}
        </div>

        <div>
          {test}
          {/* <h2>Start: {modelInstance.getCurrentEventStartDate()} {modelInstance.getCurrentEventStartTime()}</h2>
          <h2>Description: {modelInstance.getCurrentEventDescription()}</h2> */}
        </div>
        
        <div id="cameraWrapper">
          <Link to="./Camera">
            <img src={camerashutter} alt="Upload" width="40px"/>
          </Link>
        </div>
      </div>
    );
  }
}

export default InsideEvent;
