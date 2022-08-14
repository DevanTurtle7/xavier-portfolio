/**
 * The main page of the site. Routes to other pages
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import Art from './pages/Art';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import Credits from './pages/Credits';
import Admin from './admin/Admin';
import PageNotFound from './pages/PageNotFound';
import { useDispatch } from 'react-redux';
import { fetchMedia } from './redux/thunks/load_media';

const firebaseConfig = {
    apiKey: "AIzaSyA1O3ZZUuxv0-PGJPZI9UffooMkAHdyjZw",
    authDomain: "fir-2e91f.firebaseapp.com",
    databaseURL: "https://fir-2e91f.firebaseio.com",
    projectId: "fir-2e91f",
    storageBucket: "fir-2e91f.appspot.com",
    messagingSenderId: "352914266642",
    appId: "1:352914266642:web:7b8ee0cd82b397e3c296cb"
};

const IMG_URL = "https://xavier-portfolio.s3.us-east-2.amazonaws.com/";

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

function App(props) {
    const [artData, setArtData] = useState([])
    const [archiveData, setArchiveData] = useState([])
    const dispatch = useDispatch()

    dispatch(fetchMedia({db: db, collectionName: 'art'}))

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Art media={artData}/>} />
                <Route exact path='/art' element={<Art media={artData}/>} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/credits' element={<Credits />} />
                <Route exact path='/archive' element={<Archive media={archiveData} />} />
                <Route exact path='/admin' element={<Admin db={db} auth={auth} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
