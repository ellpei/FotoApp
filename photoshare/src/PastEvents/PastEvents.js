import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import "./PastEvents.css";

import firebase from '../firebase.js';
import modelInstance from '../data/Model.js';

class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      URL: null,
      eventName: null,
      keys: null,
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    this.getEvents();
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(){
    //if(message = "URLSET"){
      var url = modelInstance.getURL();
      var keys = modelInstance.getKeys();
      var eventName = modelInstance.getPastEventNames();
      this.setState({
        URL: url,
        eventName: eventName,
        keys: keys,
        status: "LOADED"
      })
    //}
  }

  getEvents(){
    console.log("getEvents!");
    modelInstance.itIsWorthTesting(modelInstance);
  }

  render() {
    let eventList = [];

    switch(this.state.status){
      case "LOADING":
        eventList = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        for(var i = 0 ; i < this.state.eventName.length ; i++){
          eventList.push(
            <div key={this.state.eventName[i]} className="col-sm-6">
              <Link to={"/EventAlbum/" + this.state.keys[i]}>
                <img id="eventWrapper" src={this.state.URL[i]} alt={"Image " + i}></img>
                <p>{this.state.eventName[i]}</p>
              </Link>
            </div>
          )
        }
        break;

      default:
        break;
    }

    return (
      <div className="PastEvents">
        <NavBar title="PastEvents" prev={this.props.history}></NavBar>
        <h2>Past Events</h2>
        <div className="textbox">
        <p>
        <br/>
        {eventList.length !== 0 ? "Below are the events you have attended. Please note that events will be removed 2 weeks after the starting date so please download the photos you desire to keep before then."
        : "You have not attended any events. We strongly advise you to get out there and attend more events, we promise it's fun!"} <br/><br/></p></div>
        <div className="row">
          {eventList}
        </div>

      </div>
    );
  }
}

export default PastEvents;
