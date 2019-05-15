import ObservableModel from "./ObservableModel";



class Model extends ObservableModel {

  constructor() {
    super();
    this._dummy = 4;
    this.state = {
      userID: "-LevyD6ImWkKD6yALlcs",
      currentEventID: "",
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

}


const modelInstance = new Model();
export default modelInstance;
