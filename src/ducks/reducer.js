import axios from 'axios';

// Initial State
const initialState = {
  user: {},
  posts: []
}

// Action Types
const GET_SESSION = 'GET_SESSION';
const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const GET_POSTS = 'GET_POSTS';
const GET_QUERY_POSTS = 'GET_QUERY_POSTS';

//Action Creators
export function getSession(){
  return {
    type: GET_SESSION,
    payload: axios('/user/session')
  }
}

export function loginUser (user) {
  return {
    type: LOGIN_USER,
    payload: axios.post('/user/login', user)
  }
}

export function registerUser (user) {
  return {
    type: REGISTER_USER,
    payload: axios.post('/user/register', user)
  }
}

export function getPosts (){
  return {
    type: GET_POSTS,
    payload: axios.get('/posts/all')
  }
}

export function getQueryPost (username) {
  return {
    type: GET_QUERY_POSTS,
    payload: axios(`/posts/post?username=${username}`)
  }
}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case `${GET_SESSION}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    case `${LOGIN_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    case `${LOGIN_USER}_REJECTED`:
      return {
        ...state,
        error: 'Username or Password Incorrect'
      }
    case `${REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    case `${REGISTER_USER}_REJECTED`:
      return {
        ...state,
        error: 'Something went wrong'
      }
    case `${GET_POSTS}_FULFILLED`:
      return {
        ...state,
        posts: action.payload.data
      }
    case `${GET_QUERY_POSTS}_FULFILLED`:
      return {
        ...state,
        posts: action.payload.data
      }
    default:
      return state
  }
}