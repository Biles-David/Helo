import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSession } from '../../ducks/reducer';
import './Nav.css';

class Nav extends Component {

  componentDidMount(){
    this.props.getSession()
  }

  render() {
    return (
      <div className='nav'>
        <div className='nav_profile_container'>
          <img className='nav_profile_pic' alt='profile' src='/avatar-pic.png' />
          <p>{this.props.user.username || 'Log In'}</p>
        </div>
        <div className='nav_links' >
          <Link className='nav_icons' to='/dashboard'><img src='/icons/home.png' alt='home'/></Link>
          <Link className='nav_icons' to='/'><img src='/icons/post.png' alt='post'/></Link>
        </div>
        <Link className='logout' to='/'><img src='/icons/power.png' alt='power'/></Link>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getSession })(Nav);