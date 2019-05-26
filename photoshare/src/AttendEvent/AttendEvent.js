import React, { Component } from "react";
import "../index.css";
import "./AttendEvent.css";
import NavBar from "../NavBar/NavBar.js";
import DisplayEvent from "../DisplayEvent/DisplayEvent.js";
//import firebase from '../firebase.js';
import * as firebase from 'firebase';
import modelInstance from "../data/Model";

class AttendEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      status: "LOADING"
    };
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    this.getData();
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(model, message) {
    console.log("IN UPDATE IN ATTEND EVENT");
    if(message == "AttendEventList"){
      console.log("YES, INSIDE IF STATEMENT");
      var eventList = modelInstance.getEventList();
      this.setState({
        events: eventList,
        status: "LOADED"
      })
    }
    else if(message == "tryAttend"){
      console.log("INSIDE ELSE IF STATEMENT");
      //this.goToEvent();

    }

    else{
      console.log("INSIDE ELSE");
    }
  }

  getData(){
    modelInstance.getAttendEventsList();
  }

  goToEvent = () => {
    this.props.history.push('/InsideEvent');
  }
  
  render() {
    let events = [];

    switch(this.state.status){
      case "LOADING":
        events = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        events = this.state.events.map((item) => {
          return (
            <DisplayEvent
              name={item.name}
              radius={item.radius}
              id={item.id}
              description={item.description}
              startDate={item.startDate}
              startTime={item.startTime}
              key={item.id}
              history={this.props.history}>
            </DisplayEvent>
          );
        })
        break;

      default:
        break;
    }

    return (
      <div className="AttendEvent">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Attend Event</h2>
        <div>Events near you: </div>
        <div className="list-container">
            <div className="new-hl"></div>
            {events}
        </div>

      </div>
    );
  }
}

export default AttendEvent;
