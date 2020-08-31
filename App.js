import React from 'react';
import logo from './logo.svg';
import './App.css';
import {firebase} from './firebaseConfig';

function App() {
	const db = firebase.firestore();
	const firebaseTest = () => {
		db.collection("cities").doc("LA").set({
			name: "Los Angeles",
			state: "CA",
			country: "USA"
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});		
	}
  return (
    <div>
      <button onClick = {firebaseTest}>Prueba</button>
    </div>
  );
}

export default App;
