const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

/**
 * 1. An action is an object with a type property
 * 2. An action creator is a function that returns action
 */
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First buy cake'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'First buy Ice Cream'
    }
}

// create initial State

// const initialState = {
//     numOfCake: 10
// }

const initialCakeState = {
    numOfCake: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

/**
 * reduce use to update state which is in the store based on action
 * The type of state consumed and produced by this reducer.
 * The type of actions the reducer can potentially respond to.
 *  */ 

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state, // it make the copy of state object and then only update numOfCake
//             numOfCake: state.numOfCake - 1
//         }
//         default: return state
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state, // it make the copy of state object and then only update numOfCake
            numOfCake: state.numOfCake - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state, // it make the copy of state object and then only update numOfCake
            numOfIceCream: state.numOfIceCream - 1
        }
        default: return state
    }
}

// combineReducers will combine all the reducers passed to it into a single reducing function
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
/**
 * the create store method from the redux library accepts a parameter
 * it is the reducer function which controls how the state transitions happen
 */
// const store = createStore(reducer)
const store = createStore(rootReducer, applyMiddleware(logger))

/**
 * once the store is created we log to the console the state of the application
 * which is initilal state getState() method is use to allow access to state
 */
console.log('initial state -> ', store.getState());
/**
 * setup a listner to the store so anythime the store update we log the state to console
 */
const unsubscribe = store.subscribe(() => {})
/**
 * The only way to change the data in the store is to call `dispatch()` on it.
 * when we dispatch the action the reducer sees that the action type is buy cake
 * it will then try to match this type (BUY_CAKE) with the switch cases and return new state
 * so now the stores state updated the listner is called which locks to the console the updated state
 * numOfCake is now 9
 * similarly for the next dispatch numOfCake is now 8
 * then for the next dispatch numOfCake is now 7
 */
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
/**
 * At the end we simply unsubscribe to any changes in the store
 */
unsubscribe()

/**
 * 1. craete store
 * 2. declare the initial state and the reducer
 * 3. define your action and action creator
 * 4. subscribe to the store
 * 5. dispatch actions to update the store (The subscriptions are snapshotted just before every `dispatch()` call.)
 * 6. unsubscribe to the changes
 */

/**
 * How to use middleware(if you want redux with extra feature middleware is the way to go)
 * 1. import applyMiddleware
 * 2. has it as a argument to createStore and pass anything (eg:- logger) as the middleware to the applyMiddleware method
 */