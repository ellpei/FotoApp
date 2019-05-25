import React, { Component } from "react";
import "../index.css";
import "./DisplayEvent.css";
import 'bootstrap/dist/css/bootstrap.css';
import modelInstance from '../data/Model.js';
import * as firebase from 'firebase';
//import PopUpForm from "../PopUpForm/PopUpForm.js";
import Modal from 'react-awesome-modal';
import { Redirect } from 'react-router';


class DisplayEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      clicked: false,
      modalvisible: false,
      authenticated: false,
      tried: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update() {

    if(modelInstance.getEventAuthStatus() === true) {
      this.setState({
        authenticated: true
      });
      console.log("auth success");
      modelInstance.attendEvent(this.props.id, this.props.name, this.props.description, this.props.startDate, this.props.startTime)
      this.goToEvent();
      modelInstance._EVENT_AUTH_STATUS = false;
      modelInstance._EVENT_AUTH_TRIED = false;
    } else {
      console.log("auth fail")
      this.setState({
        tried: true,
        modalvisible: true
      });
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  goToEvent = () => {
    this.props.history.push('/InsideEvent');
  }

  //form handler
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }
  //called when user presses submit after entering password
  handleSubmit(event) {
    modelInstance.authenticateEventPassword(this.props.id, this.state.password, modelInstance);
  }

  openModal = () => {
    this.setState({
        modalvisible : true
    });
  }

  closeModal = () => {
    this.setState({
        modalvisible : false
    });
  }

  render() {

    return (
      <div className="DisplayEvent">
        <div className="event-container">
          <div className="event-title">
            <h5><b>{this.props.name}</b></h5>
          </div>
          <div className="event-time">
            <b>Start: </b>{this.props.startDate} {this.props.startTime}
          </div>
          <div className="event-description">
          <b>Description: </b>{this.props.description}
          </div>
          <button className="small-btn" onClick={this.openModal}>Attend</button>
          <Modal visible={this.state.modalvisible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>

            <div id="modal-contents">
            <br/>
            <h4>This is a private event which requires a password.</h4>
              <br/>
              <form onSubmit={this.handleSubmit}>
                <input name="password" type="text" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                {this.state.tried === true && this.state.authenticated === false ? <p>Invalid password. Please try again.</p> : null }
                <div id="submit-container">
                  {/*this.state.authenticated === true ? <Redirect to="/InsideEvent"/> : null*/}
                    <button type="submit" className="btn">Submit</button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="horizontal-line"></div>
        </div>
      </div>
    );
  }
}

export default DisplayEvent;
