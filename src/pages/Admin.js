import { Component, Fragment } from 'react';
import Navbar from '../components/Navbar'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from 'reactstrap';

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



class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(this.updateUserState)
    }

    updateUserState = (user) => {
        console.log("hello")
        this.setState({ user: user })
    }

    test = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    signIn = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    signOut = async () => {
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        if (this.state.user == null) {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signIn}>Sign In</Button>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signOut}>Sign Out</Button>
                </Fragment>
            )
        }
    }
}

export default Admin;