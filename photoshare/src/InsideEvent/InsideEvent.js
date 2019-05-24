import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InsideEvent.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js';
import camerashutter from './camerashutter.svg';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class InsideEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEventID: modelInstance.state.currentEventID,
      currentEventObject: modelInstance.state.currentEventObject
    };
  }


  componentDidMount(){
    modelInstance.addObserver(this);
    this.getData();
    // CALL METHODS
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update(){
    //if(message = "URLSET"){
      this.setState({
        status: "LOADED"
      })
    //}
  }

  getData(){
    modelInstance.Carousel(modelInstance);
  }




  render() {

    let philippa = null;


    switch(this.state.status){
      case "LOADING":
        philippa = <div>Loading...</div>
        break;

      case "LOADED":
        //https://www.npmjs.com/package/react-responsive-carousel
        philippa = 
          <Carousel id= "carousel" 
            autoPlay = {true} 
            infiniteLoop = {true} 
            width = {500}
            centerMode = {true}
            >
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/photoshare-dm2518.appspot.com/o/-LfJzJAnjczbdDpQJAxs%2F-LevyD6ImWkKD6yALlcs%23%23%231558514181316?alt=media&token=3411e218-cad9-41f2-bb29-c12c74690470" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/photoshare-dm2518.appspot.com/o/-LfJzJAnjczbdDpQJAxs%2F-LevyD6ImWkKD6yALlcs%23%23%231558514181316?alt=media&token=3411e218-cad9-41f2-bb29-c12c74690470" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/photoshare-dm2518.appspot.com/o/-LfJzJAnjczbdDpQJAxs%2F-LevyD6ImWkKD6yALlcs%23%23%231558514181316?alt=media&token=3411e218-cad9-41f2-bb29-c12c74690470" />
                <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        break;

      default:
        break;
    }

    return (
      <div className="InsideEvent">
        <NavBar title="InsideEvent" prev={this.props.history}></NavBar>
        <h2>{this.state.currentEventObject ? this.state.currentEventObject['name'] : null }</h2>
        <Link to="./Camera">
          <button className="camera-btn"><img src={camerashutter} alt="Upload" width="40px"/></button>
        </Link>

        <div>
          {philippa}
        </div>


      </div>
    );
  }
}

export default InsideEvent;
