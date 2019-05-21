import ObservableModel from "./ObservableModel";
import firebase from '../firebase.js';

class Model extends ObservableModel {

  constructor() {


    super();
    this._dummy = 4;
    this._currentEventID = "-LfJzJAnjczbdDpQJAxs";
    this._userID = "LevyD6ImWkKD6yALlcs";

    this.state = {
      userID: "-LevyD6ImWkKD6yALlcs",
      eventID: "-LfJzJAnjczbdDpQJAxs",
      currEvent: null,
      storageRef: null
    }

  }

  getUserID() {
    return this.state.userID;
  }

  setUserID(uID) {
    this.state.userID = uID;
  }

  getEventID() {
    return this.state.currentEventID;
  }

  // getEventID(){
  //   return this._currentEventID;
  // }

  setEventID(eventID) {
    this.state.setCurrentEvent = eventID;
  }
  /*
  //gets all the events from the database
  getAllEvents() {
    var eventsRef = firebase.database.ref('events/');
    var eventList;
    eventsRef.orderByValue().on("startTime", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("The data key:" + data.key + " value: " + data.val());
        eventList.push(data.val())
      })

    });
    return eventList
  }
*/
  //adds event to the current user's attendedevents list
  addEventToUser(eventID) {
    var userRef = firebase.database().ref('users/' + this.state.userID);
    userRef.child("attendedEvents").child(eventID).set(true);
  }

  //callback to store event. Receives currlocation
  storeEvent = (pos) => {

    const eventsRef = firebase.database().ref('events');

    this.state.currEvent["latitude"] = pos.coords.latitude;
    this.state.currEvent["longitude"] = pos.coords.longitude;
    this.state.currEvent["admin"] = this.state.userID;
    var newEventRef = eventsRef.push(this.state.currEvent);
    var eventID = newEventRef.key;
    //add this new event ID to the past event list in this user
    this.addEventToUser(eventID);
    this.setCurrentEvent(eventID);
    //create an event folder in Firestore
    var storageRef = firebase.storage().ref();
    var newFolderRef = storageRef.child(eventID + '/images');   //the folder for each event is named after the eventID
    newFolderRef.putString('.')
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
    console.log("asdasd");
  }

  /*Called before uploading photo. The user must be within the event radius*/
  authenticateLocation(item, _callback, state) {
    const eventsRef = firebase.database().ref("events/-LfJzJAnjczbdDpQJAxs"); // + this.state.currEventID);
    var eventLongitude;
    var eventLatitude;
    var userLongitude;
    var userLatitude;
    var radius;

    eventsRef.once("value", function(data) {
      eventLongitude = data.child("longitude").node_.value_;
      eventLatitude = data.child("latitude").node_.value_;
      radius = data.child("radius").node_.value_;
      navigator.geolocation.getCurrentPosition((pos) => {
        userLongitude = pos.coords.longitude;
        userLatitude = pos.coords.latitude;

        var R = 6378.137; // Radius of earth in KM
        var dLat = userLatitude * Math.PI / 180 - eventLatitude * Math.PI / 180;
        var dLon = userLongitude * Math.PI / 180 - eventLongitude * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(eventLatitude * Math.PI / 180) * Math.cos(userLatitude * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = (R * c) * 1000;

        //TODO change this the other way
        if(d > radius){
          _callback(item, state);
        } else{
          console.log("THIS IS NOT OKAY");
        }
      });
    });

    //get event location
    //get event radius
  }
  
  uploadPhoto(item) {
    this.authenticateLocation(item, this.storePhoto, this.state);
  }

  storePhoto(item, state) {
    console.log("PHOTO IS BEING STORED AS WE SPEAK!");
    var path = "/" + state.eventID;
    var storageRef = firebase.storage().ref(path);
    var folderRef = storageRef.child(state.userID + "###" + item.time);
    var image64 = item.image;
    var data = image64.replace(/^data:image\/\w+;base64,/, "");

    folderRef.putString(data, 'base64', {contentType: 'image/jpg'});
  }
}

const modelInstance = new Model();
export default modelInstance;
