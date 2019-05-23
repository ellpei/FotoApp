import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PastEvents.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../firebase.js';
import modelInstance from '../data/Model.js';

class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      URL: null,
      eventName: null,
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
      var url = modelInstance._URL;
      var eventName = modelInstance.getName();
      this.setState({
        URL: url,
        eventName: eventName,
        status: "LOADED"
      })
    //}
  }

  getEvents(){
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
              <Link to={"/EventAlbum/" + this.state.eventName[i]}>
                <img id="eventWrapper" src={this.state.URL[i]}></img>
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

        <div className="row">
          {eventList}
        </div>
          
      </div>
    );
  }
}

export default PastEvents;
