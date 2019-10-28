import {combineReducers, createStore} from 'redux'

// Replaces 'actions.js'
export const setTrips = trips => ({
    type: 'SET_TRIPS',
    trips,
});

// Replaces 'reducers.js'
export const trips = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRIPS':
            return action.trips;
        default:
            return state;
    }
};

export const reducers = combineReducers({
    trips,
});

// Replaces 'store.js'
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
}

export const store = configureStore();
