import { Component, Fragment } from 'react';
import Navbar from '../components/Navbar'
import { Button, Input } from 'reactstrap';

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
            file: null,
            url: ""
        }
    }

    componentDidMount() {
        this.signOut()
        auth.onAuthStateChanged(this.updateUserState)
    }

    updateUserState = (user) => {
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
        let email = this.state.email
        let password = this.state.password

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

    imageChanged = (e) => {
        const file = e.target.files[0]
        this.setState({ file: file })
    }

    uploadImage = (e) => {
        let file = this.state.file
        const storageRef = ref(storage, file.name);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
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
                    <Button onClick={this.test}>Edit db</Button>
                    <Input
                        type="file"
                        onChange={this.imageChanged}
                    />
                    <Button onClick={this.uploadImage}>Upload</Button>
                </Fragment>
            )
        }
    }
}

export default Admin;