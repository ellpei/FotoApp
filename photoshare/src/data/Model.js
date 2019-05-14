import ObservableModel from "./ObservableModel";



class Model extends ObservableModel {

  constructor() {
    super();
    this._dummy = 4;
    this.state = {
      userID: "",
      currentEventID: "",
    }
  }

  getDummy() {
    return this._dummy;
  }

  getUserID() {
    return this.state.userID;
  }

}


const modelInstance = new Model();
export default modelInstance;
