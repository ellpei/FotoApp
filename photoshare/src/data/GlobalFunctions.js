//Here are global functions which may be importerted in components
//ex. import { HelloFunction } from './data/GlobalFunctions'

/*Return previously attended events */
export getPreviousEvents(userID) {

}

export getNearbyEvents() {
  //retrieve nearby events from database near current location
  var currLocation = navigator.geolocation.getCurrentPosition();
  //TODO make request, callback to returnNearbyEvents
}

export returnNearbyEvents() {

}
/*Called before uploading photo. The user must be within the event radius*/
export authenticateLocation(eventID) {
  //get event location

  //get event radius

}

/*The location needs to be authenticated when:
  - uploading photo
  - viewing photos
*/
