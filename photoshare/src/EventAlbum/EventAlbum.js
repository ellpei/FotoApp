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
      pictures: null,
      picture_names: null,
      eventName: null,
      eventDescription: null,
      eventStartDate: null,
      eventStartTime: null,
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    this.getPictures();
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(){
    var picturesList = modelInstance.getPictureURLs();
    var eventName = modelInstance.getCurrentEvent();
    var pictureNames = modelInstance.getPictureNames();
    var eventDescription = modelInstance.getCurrentEventDescription();
    var eventStartDate = modelInstance.getCurrentEventStartDate();
    var eventStartTime = modelInstance.getCurrentEventStartTime();

    //if(message = "URLSET"){
      this.setState({
        pictures: picturesList,
        eventName: eventName,
        eventDescription: eventDescription,
        eventStartDate: eventStartDate,
        eventStartTime: eventStartTime,
        picture_names: pictureNames,
        status: "LOADED"
      })
    //}
  }


  getPictures(){
    let eventID = window.location.href.split("/");
    console.log(decodeURIComponent(eventID[4]));
    modelInstance.generatePictures(modelInstance, decodeURIComponent(eventID[4]));
  }


  render() {
    let pictures = [];
    let albumInfo = null;
    var asda = this.state.eventStartDate + " " + this.state.eventStartTime;
    var test = new Date(asda).valueOf();
    var endDateTimeMS = test + 1.21*Math.pow(10, 9);
    var endDateString = new Date(endDateTimeMS).toLocaleString();

    switch(this.state.status){
      case "LOADING":
        pictures = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":

          albumInfo = 
            <div>
              <h2>{this.state.eventName} Photo Album</h2>
              <h3>Album will be deleted: {endDateString}</h3>
            </div>

        for(var i = 0 ; i < this.state.pictures.length ; i++){
          //console.log(this.state.pictures[i]);
          pictures.push(
            <div key={this.state.pictures[i]} className="col-sm-4">
              <Link to={"/PhotoView/" + this.state.picture_names[i]}>
                <img id="eventWrapper" src={this.state.pictures[i]} alt={"Image " + i}></img>  
              </Link>
            </div>
          )
        }
        break;

      default:
        break;
    }


    return (
      <div className="EventAlbum">
        <NavBar title="EventAlbum" prev={this.props.history}></NavBar>
        {albumInfo}
        <div className="row">{pictures}</div>
      </div>
    );
  }
}

export default EventAlbum;
