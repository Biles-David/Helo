import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, registerUser } from '../../ducks/reducer';  
import './Auth.css'

class Auth extends Component {
  constructor () {
    super()
    this.state = {
      username: null,
      password: null,
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin = () => {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(user).then(
      response => this.setState({redirect: true})
    )
  }

  handleRegister = () => {
  let user = {
    username: this.state.username,
    password: this.state.password
  }
  this.props.registerUser(user).then(
      response => this.setState({redirect: true})
    )
  }


  handleRedirect = () => {
    this.setState({redirect: false})
  }

  render() {
    if(this.state.redirect){
      this.handleRedirect()
      return <Redirect to='/Dashboard' />
    }
    return (
      <div className='auth'>
        <div className='auth_container'>
          <img className='auth_img' src='/face-wink.png' alt='logo' />
          <h1 className='auth_title'> Helo </h1>
          <div className='auth_input_box'>
            <p>Username: </p>
            <input onChange={this.handleChange} name='username' className='auth_input_style' />
          </div>
          <div className='auth_input_box'>
            <p>Password: </p>
            <input onChange={this.handleChange} name='password' type='password' className='auth_input_style' />
          </div>
          <div className='auth_button_container'>
            <button onClick={this.handleLogin} className='dark_button'>Login</button>
            <button onClick={this.handleRegister} className='dark_button'>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loginUser, registerUser })(Auth);