import { Component, Fragment } from 'react';
import Navbar from '../components/Navbar'
import { Button, Input } from 'reactstrap';
import GalleryList from './components/GalleryList';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            user: null,
        }
    }

    componentDidMount() {
        this.signOut()
        auth.onAuthStateChanged(this.updateUserState)
    }

    updateUserState = (user) => {
        this.setState({ user: user })
    }

    signIn = () => {
        let email = this.state.email
        let password = this.state.password

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    signOut = async () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.log(error)
        });
    }

    emailChanged = (e) => {
        let email = e.target.value
        this.setState({ email: email })
    }

    passwordChanged = (e) => {
        let password = e.target.value
        this.setState({ password: password })
    }

    render() {
        if (this.state.user == null) {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signIn}>Sign In</Button>
                    <Input type="text" placeholder="Email" onChange={this.emailChanged}></Input>
                    <Input type="password" placeholder="Password" onChange={this.passwordChanged}></Input>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signOut}>Sign Out</Button>
                    <GalleryList/>
                </Fragment>
            )
        }
    }
}

export default Admin;