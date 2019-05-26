import ObservableModel from "./ObservableModel";
import firebase from '../firebase.js';

class Model extends ObservableModel {

  constructor() {
    super();

    this._userID = "";
    this._userAuthenticated = false;
    this._URL = [];
    this._EVENTNAMES = null;
    this._KEYS = null;

    this._PHOTO_VIEW_PICTURE_DELETED = false;

    this._EVENT_AUTH_STATUS = false;
    this._EVENT_AUTH_TRIED = false;
    this._EVENT_PICTURE_URL = null;
    this._EVENT_PICTURE_NAME = null;
    this._EVENT_LIST = null;
    this._CURRENT_EVENT_NAME = null;
    this._CURRENT_EVENT_ID = null;
    this._CURRENT_EVENT_KEY = null;
    this._CURRENT_EVENT_DESCRIPTION = null;
    this._CURRENT_EVENT_START_DATE = null;
    this._CURRENT_EVENT_START_TIME = null;

    this._PHOTO_VIEW_PICTURE = null;
    this._PHOTO_VIEW_PICTURE_KEY = null;
    this._PHOTO_VIEW_TAKEN_BY = null;
    this._CURRENT_EVENT_OBJECT = null;

    this._PAST_EVENT_KEY = null;

    this._SUPER_TEST = false;

    this.addEventToUser = this.addEventToUser.bind(this);
  }

  //returns true if authentication is successful
  authenticateUser(username, psw, model) {

    const usersRef = firebase.database().ref('users');
    // Attach an asynchronous callback to read the data at our posts reference
    let userID = null;

    usersRef.on("value", function(snapshot) {

      let userlist = snapshot.val();
      for(let user in userlist) {
        userID = user;
        if(userlist[user].username === username && userlist[user].password === psw) {
          model._userID = userID
          model._userAuthenticated = true;
          model.notifyObservers();
        }
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  getAuthStatus() {
    return this._userAuthenticated;
  }

  getUserID() {
    return this._userID;
  }

  setUserID(uID) {
    return this._userID = uID;
  }

  getEventID() {
    return this._CURRENT_EVENT_ID;
  }

  setEventID(eventID) {
    this._CURRENT_EVENT_ID = eventID;
  }

  getCurrentEventID(){
    return this._CURRENT_EVENT_ID;
  }

  setCurrentEventID(eventID){
  this._CURRENT_EVENT_ID = eventID;
  }

  getURL(){
    return this._URL;
  }

  setURL(url){
    this._URL = url;
  }

  getPastEventNames(){
    return this._EVENTNAMES;
  }

  setPastEventNames(names){
    this._EVENTNAMES = names;
  }

  getKeys(){
    return this._KEYS;
  }

  setKeys(keys){
    this._KEYS = keys;
  }

  getPictureURLs(){
    return this._EVENT_PICTURE_URL;
  }

  setPictureURLs(pictures){
    this._EVENT_PICTURE_URL = pictures;
  }

  getCurrentEvent(){
    return this._CURRENT_EVENT_NAME;
  }

  getPictureNames(){
    return this._EVENT_PICTURE_NAME;
  }

  getPhotoViewPic(){
    return this._PHOTO_VIEW_PICTURE;
  }

  getPhotoViewTakenBy(){
    return this._PHOTO_VIEW_TAKEN_BY;
  }


  getCurrentEventDescription(){
    return this._CURRENT_EVENT_DESCRIPTION;
  }

  getCurrentEventStartDate(){
    return this._CURRENT_EVENT_START_DATE;
  }

  getCurrentEventStartTime(){
    return this._CURRENT_EVENT_START_TIME;
  }

  getPhotoViewPictureDeleted(){
    return this._PHOTO_VIEW_PICTURE_DELETED;
  }

  setPhotoViewPictureDeleted(value){
    this._PHOTO_VIEW_PICTURE_DELETED = value;
  }

  getEventKey(){
    return this._PAST_EVENT_KEY;
  }

  setEventKey(eventKey){
    this._PAST_EVENT_KEY = eventKey;
  }

  getEventList(){
    return this._EVENT_LIST;
  }

  //must be called if you enter an event through "AttendEvent"
  getCurrentEventObject() {
    const eventsRef = firebase.database().ref('events/' + this._CURRENT_EVENT_ID);
    eventsRef.on("value", (snapshot) => {
      let item = snapshot.val();
      this._CURRENT_EVENT_OBJECT = item;
    });
    return this._CURRENT_EVENT_OBJECT;
  }

  //callback to store event. Receives currlocation
  storeEvent = (pos) => {
    const eventsRef = firebase.database().ref('events');
    this._CURRENT_EVENT_OBJECT["latitude"] = pos.coords.latitude;
    this._CURRENT_EVENT_OBJECT["longitude"] = pos.coords.longitude;
    this._CURRENT_EVENT_OBJECT["admin"] = this._userID;

    var newEventRef = eventsRef.push(this._CURRENT_EVENT_OBJECT);
    var eventID = newEventRef.key;

    //add this new event ID to the past event list in this user
    this.addEventToUser(eventID);
    //this._CURRENT_EVENT_ID = eventID;
    //create an event folder in Firestore
    var storageRef = firebase.storage().ref();
    var newFolderRef = storageRef.child(eventID + '/images');   //the folder for each event is named after the eventID
    newFolderRef.putString('.')
  }

  createEvent(newEvent) {
    this._CURRENT_EVENT_OBJECT = newEvent;

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.storeEvent);
    } else {
      let coords = {
        latitude: 0,
        longitude: 0
      };
      this.storeEvent(coords)
    }
  }

  addEventToUser = (eventID) => {
    var userRef = firebase.database().ref('users/' + this._userID);
    userRef.child("attendedEvents").child(eventID).set(this._CURRENT_EVENT_NAME);

    this._CURRENT_EVENT_ID = eventID
  }

  getEventAuthStatus() {
    return this._EVENT_AUTH_STATUS;
  }

  getEventAuthTried() {
    return this._EVENT_AUTH_TRIED;
  }

  authenticateEventPassword(eventID, password, model, props) {
    console.log("authenticateEventPassword 1");
    model._EVENT_AUTH_STATUS = true;
    console.log("authenticateEventPassword 2");
    model._CURRENT_EVENT_ID = eventID;
    console.log("authenticateEventPassword 3");

//       const eventsRef = firebase.database().ref("events/" + eventID);
//     eventsRef.once("value").then(function(snapshot) {
//       console.log("what the fuck");
//       let eventobj = snapshot.val();
//  //     if(eventobj.password == password) {
//       if(true) {
//         alert(eventobj.password);
//         model._EVENT_AUTH_STATUS = true;
//         console.log("CORRECT PASS ID: " + eventID);
//         model._CURRENT_EVENT_ID = eventID;
//         model.notifyObservers("tryAttend");
//       }
//     });

    firebase.database().ref("events/" + eventID).once("value").then(function(data){
      console.log("authenticateEventPassword 4");
      console.log("Check Password");
      let eventobj = data.val();
      if(eventobj.password == password){
        console.log("authenticateEventPassword 5");
        alert("CORRECT PASSWORD" + eventobj.password);
      }
      console.log("authenticateEventPassword 6");
      //this.notifyObservers("tryAttend");
    });
  }

  attendEvent = (eventID, eventName, eventDescription, eventStartDate, eventStartTime) => {
    console.log("eventID: " + eventID);
    //this._CURRENT_EVENT_ID = eventID;
    // this._CURRENT_EVENT_NAME = eventName;
    // this._CURRENT_EVENT_DESCRIPTION = eventDescription;
    // this._CURRENT_EVENT_START_DATE = eventStartDate;
    // this._CURRENT_EVENT_START_TIME = eventStartTime;

    // this.getCurrentEventObject();
    // this.addEventToUser(eventID);
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
  authenticateLocation(item, _callback, model) {
    const eventsRef = firebase.database().ref("events/" + model._CURRENT_EVENT_ID);
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
        if(d < radius){
          _callback(item, model);
        } else{
          console.log("THIS IS NOT OKAY");
        }
      });
    });

    //get event location
    //get event radius
  }

  deletePhoto(){
    var model = this;
    firebase.database().ref("events/" + this._CURRENT_EVENT_KEY).once("value").then(function(data){      
      for(var pic in data.child("pictures").val()){
        if(data.child("pictures").child(pic).val() === model._PHOTO_VIEW_PICTURE_KEY){
          firebase.database().ref("events/" + model._CURRENT_EVENT_KEY + "/pictures").child(pic).remove();
          model._PHOTO_VIEW_PICTURE_DELETED = true;
          model.notifyObservers();
        }
      }
    })
  }

  uploadPhoto(item) {
    this.authenticateLocation(item, this.storePhoto, this);
  }

  storePhoto(item, model) {
    var path = "/" + model._CURRENT_EVENT_ID;
    var storageRef = firebase.storage().ref(path);
    var folderRef = storageRef.child(model._userID + "###" + item.time);
    var image64 = item.image;
    var data = image64.replace(/^data:image\/\w+;base64,/, "");
    folderRef.putString(data, 'base64', {contentType: 'image/jpg'});

    const eventsRef = firebase.database().ref("events/" + model._CURRENT_EVENT_ID + "/pictures/");
    eventsRef.push(model._userID + "###" + item.time);
  }

  getUsersEvents(){
    const userEvents = firebase.database().ref("users/" + this.getUserID() + "/attendedEvents");

    return userEvents.once("value", function(data) {});;

  }

  getCoverPhoto(eventID){
    const refDatabase = firebase.database().ref("events/" + eventID + "/pictures");
    // var firstPictureKey;
     return refDatabase.once("value", function(data) {});
  }

  getOnePicture(model, pictureKey){
    this._PHOTO_VIEW_PICTURE_KEY = pictureKey;
    var userID = pictureKey.split("###")[0]
    
    const ref1 = firebase.storage().ref(model._CURRENT_EVENT_KEY + "/" + pictureKey);
    const ref2 = firebase.database().ref("users/" + userID);

    //promises.push(firebase.database().ref("users/" + this.getUserID() + "/attendedEvents").once("value"));

    var promises = [];

    promises.push(ref1.getDownloadURL());
    promises.push(ref2.once("value"));

    Promise.all(promises).then(function(data){
      model._PHOTO_VIEW_PICTURE = data[0];
      model._PHOTO_VIEW_TAKEN_BY = data[1].val().username;
      model.notifyObservers();
    });
  }

  generatePictures(model, eventKey){
    var promises = [];
    var pictures_URL = [];
    var pictures_Name = [];
    var picture_KEYS = [];
    var eventName = null;
    var promises3 = [];
    model._CURRENT_EVENT_KEY = eventKey;
    promises.push(firebase.database().ref("events/" + eventKey).once("value"));
    Promise.all(promises).then(function(data) {
      eventName = data[0].val().name;
      model._CURRENT_EVENT_NAME = data[0].val().name;
      model._CURRENT_EVENT_DESCRIPTION = data[0].val().description;
      model._CURRENT_EVENT_START_DATE = data[0].val().startDate;
      model._CURRENT_EVENT_START_TIME = data[0].val().startTime;

      for(var pic in data[0].child("pictures").val()){
        picture_KEYS.push(pic);    
        pictures_Name.push(data[0].child("pictures").child(pic).val());
        const ref = firebase.storage().ref(eventKey + "/");
        var refPic = ref.child(data[0].child("pictures").child(pic).val());
        promises3.push(refPic.getDownloadURL());
      }

      Promise.all(promises3).then(function(data4){
        for(var i = 0 ; i < data4.length ; i++){
          pictures_URL.push(data4[i]);
          //console.log(data4[i]);
        }
        model._EVENT_PICTURE_URL = pictures_URL;
        model._EVENT_PICTURE_NAME = pictures_Name;
        model._EVENT_PICTURE_KEYS = picture_KEYS;

        model.notifyObservers();

      });
    });
  }

  itIsWorthTesting(model){
    var promises = [];
    var URL = [];
    var eventName = [];
    var keys = [];

    promises.push(firebase.database().ref("users/" + this.getUserID() + "/attendedEvents").once("value"));
    Promise.all(promises).then(function(data){
      var promises2 = [];
      for(var key in data[0].val()){
        eventName.push(data[0].child(key).node_.value_);
        keys.push(key);
        promises2.push(firebase.database().ref("events/" + key + "/pictures").once("value"));
      }

      Promise.all(promises2).then(function(data2) {
        var promises3 = [];
        for (var p = 0 ; p < data2.length ; p++){
          for (var pic in data2[p].val()){
            const ref = firebase.storage().ref(keys[p] + "/");
            var refPic = ref.child(data2[p].child(pic).val());
            promises3.push(refPic.getDownloadURL());
            break;
          }
        }

        Promise.all(promises3).then(function(dataURL) {
          for(var p = 0 ; p < dataURL.length ; p++){
            model._URL.push(dataURL[p]);
          }
          model.notifyObservers();
        })
      });

      model._EVENTNAMES = eventName;
      model._KEYS = keys;
    });
  }

  getAttendEventsList(){
    console.log("getAttendEventList() called in the model");
    const eventsRef = firebase.database().ref('events');

    let model = this;
    eventsRef.once("value").then(function(snapshot) {
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
      model._EVENT_LIST = newState;
      console.log("getAttendEventList() is soon to call notifyObservers");
      model.notifyObservers("AttendEventList", "AttendEventList");
    });
  }

  generatePictureCarousel(model){
    firebase.database().ref("events/" + model._CURRENT_EVENT_ID).once("value").then(function(data) {
      let promises = [];
      let pictures_URL = []

      for(var pic in data.child("pictures").val()){
        //pictures_Name.push(data[0].child("pictures").child(pic).val());
        const ref = firebase.storage().ref(model._CURRENT_EVENT_ID + "/");
        var refPic = ref.child(data.child("pictures").child(pic).val());
        promises.push(refPic.getDownloadURL());
      }

      Promise.all(promises).then(function(data){
        for(var i = 0 ; i < data.length ; i++){
          pictures_URL.push(data[i]);
        }
        model._EVENT_PICTURE_URL = pictures_URL;
        model.notifyObservers();
      });
    });
  }
}

const modelInstance = new Model();
export default modelInstance;
