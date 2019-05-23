import ObservableModel from "./ObservableModel";
import firebase from '../firebase.js';

class Model extends ObservableModel {

  constructor() {
    super();
    this._dummy = 4;
    this._currentEventID = "-LfJzJAnjczbdDpQJAxs";
    this._userID = "LevyD6ImWkKD6yALlcs";

    this._URL = null;
    this._NAME = null;


    this.state = {
      userID: "-LevyD6ImWkKD6yALlcs",
      eventID: "-LfJzJAnjczbdDpQJAxs",
      currentEventObject: null,  //current event object
      currEvent: null,
      storageRef: null,
      eventName: ""
    }

    this.addEventToUser = this.addEventToUser.bind(this);
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

  setEventID(eventID) {
    this.state.setCurrentEvent = eventID;
  }

  getURL(){
    return this._URL;
  }

  setURL(url){
    this._URL = url;
  }

  getName(){
    return this._NAME;
  }

  setName(name){
    this._NAME = name;
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
  */

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
    userRef.child("attendedEvents").child(eventID).set(this.state.eventName);

    this.state.eventID =  eventID

  }

  attendEvent = (eventID, eventName) => {
    this.state.eventID = eventID;
    this.state.eventName = eventName;
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

    const eventsRef = firebase.database().ref("events/" + state.eventID + "/pictures/");
    eventsRef.push(state.userID + "###" + item.time);
  }

  getUsersEvents(){
    const userEvents = firebase.database().ref("users/" + this.getUserID() + "/attendedEvents");

    return userEvents.once("value", function(data) {
      console.log(data.val());
    });;

  }

  getCoverPhoto(eventID){
    const refDatabase = firebase.database().ref("events/" + eventID + "/pictures");
    // var firstPictureKey;
     return refDatabase.once("value", function(data) {
      console.log(data.val());
    });
  }

  itIsWorthTesting(model){
    var promises = [];
    var URL = [];
    var eventName = [];
    var keys = [];
    
    promises.push(firebase.database().ref("users/" + this.getUserID() + "/attendedEvents").once("value"));
    Promise.all(promises).then(function(data){
      for(var key in data[0].val()){
        var promises2 = [];
        eventName.push(data[0].child(key).node_.value_);
        keys.push(key);
        promises2.push(firebase.database().ref("events/" + key + "/pictures").once("value"));
        var keysCount = 0;
        Promise.all(promises2).then(function(data2) {

          for (var pic in data2[0].val()){
            const ref = firebase.storage().ref(keys[keysCount] + "/");
            var refPic = ref.child(data2[0].child(pic).val());
            var promises3 = [];

            promises3.push(refPic.getDownloadURL());

            keysCount = keysCount + 1; 

            break;
          }

          Promise.all(promises3).then(function(dataURL) {
            URL.push(dataURL[0]);
            model.notifyObservers();
          })
        });
      }

      model._URL = URL;
      model._NAME = eventName;
    });
  }
}

const modelInstance = new Model();
export default modelInstance;
