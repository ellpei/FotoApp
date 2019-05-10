import ObservableModel from "./ObservableModel";



class Model extends ObservableModel {
  constructor() {
    super();
    this._dummy = 4;
    
  }

  getDummy() {
    return this._dummy;
  }
  
}


const modelInstance = new Model();
export default modelInstance;
