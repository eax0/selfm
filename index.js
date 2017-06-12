//import makeStore from './src/store';
import {startServer} from './src/express-server';

//export const store = makeStore();
startServer();

/*
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./resources/entries.json')
});

store.dispatch({type: 'NEXT'});*/
