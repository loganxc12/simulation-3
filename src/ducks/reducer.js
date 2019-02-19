//INITIAL STATE 
const INITIAL_STATE = {
    user: null,
    tweets: []
}
//REDUCER
export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_TWEETS:
            return Object.assign({}, state, { tweets: action.payload });
        default: 
            return state;
    }
}
//ACTION TYPES
const UPDATE_USER = "UPDATE_USER";
const UPDATE_TWEETS = "UPDATE_TWEETS";

//ACTION CREATORS
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateTweets(tweets) {
    return {
        type: UPDATE_TWEETS,
        payload: tweets
    }
}