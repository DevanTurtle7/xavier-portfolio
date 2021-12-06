import { Component } from 'react';
import {
    Button,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    FormFeedback,
    FormGroup
} from 'reactstrap';
import UploadButton from './UploadButton';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { nextUntil } from 'dom-helpers';
import { MdNoCell } from 'react-icons/md';

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

class GalleryList extends Component {

    render() {
        return (
            <Col>
                <UploadButton />
            </Col>
        )
    }
}

export default GalleryList;