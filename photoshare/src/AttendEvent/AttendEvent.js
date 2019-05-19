import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./AttendEvent.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import modelInstance from '../data/Model.js';
//import firebase from '../firebase.js';
import * as firebase from 'firebase';

class AttendEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: []
    };
    //var list = this.getEvents();

  }

  /*

  getEvents = () => {

    const eventsRef = firebase.database().ref('events');
    eventsRef.once("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        var thisEvent = {
          key: childSnapshot.key,
          data: childSnapshot.val()
        }
        this.events.push(thisEvent)
      });
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return events;
  }
  */

  attendEvent = (eventID) => {
    modelInstance.addEventToUser(eventID);
  }
  //render all the events within reach of current location
  renderEvents = () => {

    const eventsRef = firebase.database().ref('events');
    let evs;

    eventsRef.once("value", function(snapshot) {

      snapshot.forEach(function(childsnap) {
        //alert("name: " + childsnap.val().name)
        const element = <div className="event">Name: {childsnap.val().name}</div>;
        evs += element;
      });
      return (<div>{evs}</div>);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return <div>test: {evs}</div>;
  }

  render() {

    return (
      <div className="AttendEvent">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Attend Event</h2>
        <div className="list-container">
        {this.renderEvents()}
        </div>
      </div>
    );
  }
}

export default AttendEvent;
