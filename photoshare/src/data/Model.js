import ObservableModel from "./ObservableModel";
import firebase from '../Firebase/firebase.js';

class Model extends ObservableModel {

  constructor() {
    super();
    this._dummy = 4;
    this.state = {
      userID: "-LevyD6ImWkKD6yALlcs",
      currentEventID: "",
      currEvent: null
    }
  }

  getDummy() {
    return this._dummy;
  }

  getUserID() {
    return this.state.userID;
  }

  setUserID(uID) {
    this.state.userID = uID;
  }

  getCurrentEvent() {
    return this.state.currentEventID;
  }

  setCurrentEvent(eventID) {
    this.state.setCurrentEvent = eventID;
  }

  //adds event to the current user's attendedevents list
  addEventToUser(eventID) {

    var userRef = firebase.database().ref('users/' + this.state.userID);
    userRef.child("attendedEvents").child(eventID).set(true);

    //previousEvents.push(eventID);
    //firebase.database().ref('users/' + userID + '/attendedEvents').set(previousEvents);
  }

  //callback to store event. Receives currlocation
  storeEvent = (pos) =>  {
    alert("calback to storeEvent")
    const eventsRef = firebase.database().ref('events');

    this.state.currEvent["latitude"] = pos.coords.latitude;
    this.state.currEvent["longitude"] = pos.coords.longitude;
    this.state.currEvent["admin"] = this.state.userID;
    var newEventRef = eventsRef.push(this.state.currEvent);
    var eventID = newEventRef.key;
    //add this new event ID to the past event list in this user
    this.addEventToUser(eventID);
    this.setCurrentEvent(eventID);
  }

  createEvent(newEvent) {
    this.state.currEvent = newEvent;

    if(navigator.geolocation) {
      var currLocation = navigator.geolocation.getCurrentPosition(this.storeEvent);
    } else {
      let coords = {
        latitude: 0,
        longitude: 0
      };
      this.storeEvent(coords)
    }
  }

  createUser(userData) {
    const userRef = firebase.database().ref('users');
    var newUserRef = userRef.push(userData);
    var thisUserID = newUserRef.key;
    this.setUserID(thisUserID);
  }

  getNearbyEvents() {
    //retrieve nearby events from database near current location
    var currLocation = navigator.geolocation.getCurrentPosition();
    //TODO make request, callback to returnNearbyEvents
  }

  returnNearbyEvents() {

  }
  /*Called before uploading photo. The user must be within the event radius*/
  authenticateLocation(eventID) {
    //get event location

    //get event radius

  }

}

const modelInstance = new Model();
export default modelInstance;
