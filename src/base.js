import Rebase from 're-base';
import firebase from 'firebase';
import options from './config/baseConfig';

const config = {
	apiKey: options.apiKey,
	authDomain: options.authDomain,
	databaseURL: options.databaseURL,
	projectId: options.projectId,
	storageBucket: options.storageBucket,
	messagingSenderId: options.messagingSenderId,
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, base, facebookProvider }
