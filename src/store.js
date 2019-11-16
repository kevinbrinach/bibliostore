import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/*Custom reducers*/
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyA7B5LHZ-5qovgbe4xQfZ7THOlI3lSQscU",
    authDomain: "bibliostore-8420e.firebaseapp.com",
    databaseURL: "https://bibliostore-8420e.firebaseio.com",
    projectId: "bibliostore-8420e",
    storageBucket: "bibliostore-8420e.appspot.com",
    messagingSenderId: "809625267116",
    appId: "1:809625267116:web:1ba756b5dce6d91f742809",
    measurementId: "G-T3BEVLFQ4H"

}

//inicializar firebase con la config de arriba
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//crear el enhancer o potenciador con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//Reducers
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer,
    usuario : buscarUsuarioReducer
})


//state inicial
const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;