import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../index.css";
import "./LogIn.css";
import "../data/Model.js";
import modelInstance from '../data/Model.js';
import { Redirect } from 'react-router'


class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      authenticated: false,
      tried: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    modelInstance.addObserver(this);
  }

  componentWillUnmount(){
    modelInstance.removeObserver(this);
  }

  update() {

    if(modelInstance.getAuthStatus() === true) {
      this.setState({
        authenticated: true
      });
      this.goToHome();
    } else {
      this.setState({
        tried: true
      })
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  goToHome = () => {
    this.props.history.push('/Home');
  }

  handleSubmit(event) {

    modelInstance.authenticateUser(this.state.username, this.state.password, modelInstance);

    this.setState({
      submitted: true,
      tried: true
    });

    event.preventDefault();
  }

  render() {

    return (
      <div className="LogIn">
        <div id="outer-box">
          <h1>PhotoShare.</h1>
          <div id="leftalign">
            <p> Capture the moment with our revolutionizing event-based photo sharing platform.</p>
          </div>

          <br/><br/>
          <form onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder= "Username" value={this.state.username} onChange={this.handleChange} required/>
          <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          {this.state.tried === true && this.state.authenticated === false ? <p>Invalid username or password. Please try again.</p> : null }

          <div id="submit-container">
            {this.state.authenticated === true ? <Redirect to="Home"/> : null}
              <button type="submit" className="btn">Log In</button>
          </div>
        </form>
        <br/>
        <br/>
          <Link to="/SignUp">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>

    );
  }
}

export default LogIn;
