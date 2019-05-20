import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./AttendEvent.css";
import NavBar from "../NavBar/NavBar.js";
import DisplayEvent from "../DisplayEvent/DisplayEvent.js";
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

  render() {

    return (
      <div className="AttendEvent">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Attend Event</h2>
        <div>Events near you: </div>
        <div className="list-container">
            <div className="new-hl"></div>
            {this.state.events.map((item) => {
              return (
                <DisplayEvent
                name={item.name}
                radius={item.radius}
                id={item.id}
                description={item.description}
                startDate={item.startDate}
                startTime={item.startTime}
                key={item.id}
                history={this.props.history}></DisplayEvent>
              );
            })}

        </div>

      </div>
    );
  }
}

export default AttendEvent;
