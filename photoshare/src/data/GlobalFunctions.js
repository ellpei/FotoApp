//Here are global functions which may be importerted in components
//ex. import { HelloFunction } from './data/GlobalFunctions'
import firebase from '../firebase.js';
import modelInstance from "./Model.js";

var currEvent;

export function createEvent(newEvent) {
  currEvent = newEvent;

  if(navigator.geolocation) {
    var currLocation = navigator.geolocation.getCurrentPosition(storeEvent);
  } else {
    let coords = {
      latitude: 0,
      longitude: 0
    };
    storeEvent(coords)
  }
}
//callback to store event. Receives currlocation
function storeEvent(pos) {
  alert("calback to storeEvent")
  const eventsRef = firebase.database().ref('events');

  currEvent["latitude"] = pos.coords.latitude;
  currEvent["longitude"] = pos.coords.longitude;
  currEvent["admin"] = modelInstance.getUserID();
  var newEventRef = eventsRef.push(currEvent);
  var eventID = newEventRef.key;
  //add this new event ID to the past event list in this user
  addEventToUser(eventID);
  modelInstance.setCurrentEvent(eventID);
}
//adds event to the current user's attendedevents list
export function addEventToUser(eventID) {

  var userID = modelInstance.getUserID();
  var userRef = firebase.database().ref('users/' + userID);
  userRef.child("attendedEvents").child(eventID).set(true);

  //previousEvents.push(eventID);
  //firebase.database().ref('users/' + userID + '/attendedEvents').set(previousEvents);
}

export function createUser(userData) {
  const userRef = firebase.database().ref('users');
  var newUserRef = userRef.push(userData);
  var thisUserID = newUserRef.key;
  modelInstance.setUserID(thisUserID);
}

export function getNearbyEvents() {
  //retrieve nearby events from database near current location
  var currLocation = navigator.geolocation.getCurrentPosition();
  //TODO make request, callback to returnNearbyEvents
}

export function returnNearbyEvents() {

}
/*Called before uploading photo. The user must be within the event radius*/
export function authenticateLocation(eventID) {
  //get event location

  //get event radius

}

/*The location needs to be authenticated when:
  - uploading photo
  - viewing photos
*/
