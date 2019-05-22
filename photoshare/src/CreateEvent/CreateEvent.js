import React, { Component } from "react";
import "../index.css";
import "./CreateEvent.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../firebase.js';
import modelInstance from '../data/Model.js';
import { Redirect } from 'react-router'

class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      radius: '',
      duration: '',
      startDate: null,
      startTime: null,
      password: '',
      description: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    //get currenttime

    //store to database
    const item = {
      name: this.state.name,
      radius: this.state.duration,
      password: this.state.password,
      description: this.state.description,
      longitude: null,
      latitude: null,
      startTime: this.state.startTime,
      startDate: this.state.startDate
    };
    modelInstance.createEvent(item);
    event.preventDefault();
    this.setState({
      submitted: true
    });
  }

  render() {
    return (
      <div className="CreateEvent">
        <NavBar title="Create Event" prev={this.props.history}></NavBar>
        <h2>Create Event</h2>
          <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" placeholder= "Event name" value={this.state.name} onChange={this.handleChange} required/>
          <input name="radius" type="text" placeholder= "Event radius (m)" value={this.state.radius} onChange={this.handleChange} required/>
          <input name="startDate" id="datepicker" type="date" placeholder="Starting date" value={this.state.startDate} onChange={this.handleChange} required/>
          <input name="startTime" id="timepicker" type="time" min="0:00" max="24:00" placeholder="Starting time" value={this.state.startTime} onChange={this.handleChange} required/>
          <input name="duration" type="number" placeholder="Duration (hours)" value={this.state.duration} onChange={this.handleChange} required/>
          <input name="password" type="text" placeholder="Event password" value={this.state.password} onChange={this.handleChange} required/>
          <input name="description" type="text" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
          <div id="submit-container">
            {this.state.submitted ? <Redirect to="InsideEvent"/> : null}
            <input id="submit-btn" type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEvent;
