import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getQueryPost } from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import './Dashboard.css'

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      posts: [],
      username: null,
      reset: false
    }
  }

  componentDidMount(){
    this.props.getPosts().then(
      response => this.setState({posts: response.value.data})
    )
  }

  componentDidUpdate(prevProps){
    if(prevProps.posts !== this.props.posts){
      this.setState({reset: true})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleClick = () => {
    this.props.getQueryPost(this.state.username).then(
      response => this.setState({posts: response.value.data})
    )
  }

  render() {
    console.log(this.state.posts)
    let map = []
    if(this.state.posts[0]){
      map = this.state.posts.map( (e, i) => {
        return (
          <div key={i} className='dashboard_post'>
            <div className='dashboard_post_title'>
              <h4>{e.user_id}</h4>
              <h4>{e.username}</h4>
            </div>
            <p className='dashboard_post_p'> {e.posts}</p>
          </div>
        )
      })
    }
    return (
      <div className='dashboard'>
        <Nav/>
        <div className='dashboard_container'>
          <div className='dashboard_box_search'>
            <p>Search by Username: </p>
            <input name='username' onChange={this.handleChange}/>
            <button onClick={this.handleClick} className='dashboard_search_button'> Confirm</button>
          </div>
          <div className='dashboard_box_posts'>
            {map}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getPosts, getQueryPost })(Dashboard);