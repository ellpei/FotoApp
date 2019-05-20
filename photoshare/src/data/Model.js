import ObservableModel from "./ObservableModel";
import firebase from '../firebase.js';

class Model extends ObservableModel {

  constructor() {
    super();
    this._dummy = 4;
    this.state = {
      userID: "-LevyD6ImWkKD6yALlcs",
      currentEventID: "",
      currentEventObject: null,  //current event object
      storageRef: null
    }
    this.addEventToUser = this.addEventToUser.bind(this);
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


  //must be called if you enter an event through "AttendEvent"
  getCurrentEventObject() {
    const eventsRef = firebase.database().ref('events/' + this.state.currentEventID);
    eventsRef.on("value", (snapshot) => {
      let item = snapshot.val();
      this.state.currentEventObject = item;
    });
    return this.state.currentEventObject;
  }
  //callback to store event. Receives currlocation
  storeEvent = (pos) => {

    const eventsRef = firebase.database().ref('events');

    this.state.currentEventObject["latitude"] = pos.coords.latitude;
    this.state.currentEventObject["longitude"] = pos.coords.longitude;
    this.state.currentEventObject["admin"] = this.state.userID;
    var newEventRef = eventsRef.push(this.state.currentEventObject);
    var eventID = newEventRef.key;
    //add this new event ID to the past event list in this user
    this.addEventToUser(eventID);
    this.state.currentEventID = eventID;
    //create an event folder in Firestore
    var storageRef = firebase.storage().ref();
    var newFolderRef = storageRef.child(eventID + '/images');   //the folder for each event is named after the eventID
    newFolderRef.putString('.')
  }

  createEvent(newEvent) {
    this.state.currentEventObject = newEvent;

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

  addEventToUser = (eventID) => {
    var userRef = firebase.database().ref('users/' + this.state.userID);
    userRef.child("attendedEvents").child(eventID).set(true);

    this.state.currentEventID =  eventID

  }

  attendEvent = (eventID) => {
    this.state.currentEventID = eventID;
    this.getCurrentEventObject();
    this.addEventToUser(eventID);
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
