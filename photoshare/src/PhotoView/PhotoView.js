import React, { Component } from "react";
import "../index.css";
import "./PhotoView.css";
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js';
import cancelbutton from './cancelbtn.svg';

class PhotoView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      URL: null,
      takenTime: null,
      takenBy: null,
      eventName: null,
      ableToDelete: null,
      status: "LOADING"
    };
  }
  //called automatically when the DOM is shown to the user
  componentDidMount(){
    modelInstance.addObserver(this);
    this.getData();
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }


  update(){
    var isDeleted = modelInstance.getPhotoViewPictureDeleted();

    if(isDeleted){
      modelInstance.setPhotoViewPictureDeleted(false);
      console.log("THIS PHOTO IS DELTETD REDIRECT!");

     // (modelInstance.getEventKey());
      this.props.history.push("/EventAlbum/" + modelInstance.getEventKey());

    } else{
      console.log("WHY??");
      var url = modelInstance.getPhotoViewPic();
      var takenBy = modelInstance.getPhotoViewTakenBy();
      var takenByID = window.location.href.split("/");

      for(var i = 0 ; i < takenByID.length ; i++){
        if(takenByID[i].includes("###")){
          takenByID = takenByID[i].split("###")[0];
        }
      }

      var eventName = modelInstance.getCurrentEvent();
      var takenTime = new Date(parseInt(window.location.href.split("###")[1])).toLocaleString();
      var ableToDelete = false;
  
      console.log("modelInstance.getUserID(): " + modelInstance.getUserID());
      if (modelInstance.getUserID() === takenByID){
        console.log("ableToDelete = True")
        ableToDelete = true;
      }
  
      //if(message = "URLSET"){
      this.setState({
        URL: url,
        takenTime: takenTime,
        eventName: eventName,
        takenBy: takenBy,
        ableToDelete: ableToDelete,
        status: "LOADED"
      })
      //}
    }
  }


  getData(){
    let eventID = window.location.href.split("/");
    // console.log(decodeURIComponent(eventID[4]));
    modelInstance.getOnePicture(modelInstance, decodeURIComponent(eventID[4]));
   }

   deletePhoto(){
    var takenBy = modelInstance.getPhotoViewTakenBy();
    var takenByID = window.location.href.split("/");

    for(var i = 0 ; i < takenByID.length ; i++){
      if(takenByID[i].includes("###")){
        takenByID = takenByID[i].split("###")[0];
      }
    }

    modelInstance.deletePhoto();
   }

  render() {
    let picture = null;
    let pictureInfo = null;
    let deleteButton = null;

    switch(this.state.status){
      case "LOADING":
        picture = <div className="col-sm-12"><em>Loading...</em></div>
        break;

      case "LOADED":
        if(this.state.ableToDelete){
          deleteButton = 
            <div>
                <button id="deleteBtn" onClick={this.deletePhoto}>
                  <img src={cancelbutton} width="48px" alt="Delete"/>
                </button>
            </div>
        }

        pictureInfo = 
          <div>
            <h4>Taken By: {this.state.takenBy}</h4>
            <h4>Event: {this.state.eventName}</h4>
            <h4>Taken Time: {this.state.takenTime}</h4>
          </div>

        picture =
          <div>
            <img src={this.state.URL}></img>
          </div>
        break;

      default:
        break;
    }




    return (
      <div className="PhotoView">
        <NavBar title="PhotoView" prev={this.props.history}></NavBar>
        <h2>Photo View</h2>
        <div>
          {picture}
        </div>
        <div>
          {pictureInfo}
          {deleteButton}
        </div>
        


      </div>
    );
  }
}

export default PhotoView;
