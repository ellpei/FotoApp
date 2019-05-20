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
      loaded: false,
      events: []
    };
  }
  //called automatically when the DOM is shown to the user
  componentDidMount = () => {
    const eventsRef = firebase.database().ref('events');

    eventsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for(let item in items) {
        newState.push({
          id: item,
          admin: items[item].admin,
          description: items[item].description,
          latitude: items[item].latitude,
          longitude: items[item].longitude,
          name: items[item].name,
          radius: items[item].radius,
          startDate: items[item].startDate,
          startTime: items[item].startTime
        });
      }
      this.setState( {
        events: newState
      });
    });
  }

  attendEvent = (eventID) => {
    modelInstance.addEventToUser(eventID);
  }

  render() {

    return (
      <div className="AttendEvent">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Attend Event</h2>
        <div className="list-container">
          <ul>
            {this.state.events.map((item) => {
              return (
                <li key={item.id}>
                  <p>Name: {item.name}</p>
                </li>
              )
            })}
          </ul>
        </div>

      </div>
    );
  }
}

export default AttendEvent;
