const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
/**
 * Redux Thunk is a middleware that lets you call action creators 
 * that return a function instead of an action object
 */
const thunkMiddleare = require('redux-thunk').default
const axios = require('axios')

// initialize state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// added actions type
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

// added 3 action creator
const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users,
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

// added reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default: return state
    }
}

const fetchUSers = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleare))
store.subscribe(() => {console.log(store.getState());})
store.dispatch(fetchUSers())