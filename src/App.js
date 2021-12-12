import './style/App.css';
import { Component } from 'react';
import Art from './pages/Art';
import Sketchbook from './pages/Sketchbook';
import Contact from './pages/Contact';
import Admin from './admin/Admin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1O3ZZUuxv0-PGJPZI9UffooMkAHdyjZw",
  authDomain: "fir-2e91f.firebaseapp.com",
  databaseURL: "https://fir-2e91f.firebaseio.com",
  projectId: "fir-2e91f",
  storageBucket: "fir-2e91f.appspot.com",
  messagingSenderId: "352914266642",
  appId: "1:352914266642:web:7b8ee0cd82b397e3c296cb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

class App extends Component {
  render() {
    return (
      <Router>
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' element={<Art db={db} storage={storage}/>} />
          <Route exact path='/art' element={<Art db={db} storage={storage}/>} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/sketchbook' element={<Sketchbook />} />
          <Route exact path='/admin' element={<Admin db={db} storage={storage} auth={auth}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
