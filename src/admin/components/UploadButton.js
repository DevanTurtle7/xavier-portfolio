import { Component, Fragment } from 'react';
import {
    Button,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    FormFeedback,
    FormGroup,
    ModalHeader
} from 'reactstrap';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

class UploadButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            url: "",
            modalOpen: false,
            title: "",
            year: null,
            medium: "",
            images: []
        }
    }

    imageChanged = (e) => {
        const file = e.target.files[0]
        this.setState({ file: file })
    }

    openModal = () => {
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({
            file: null,
            url: "",
            modalOpen: false,
            title: "",
            year: null,
            medium: ""
        })
    }

    toggleModal = () => {
        if (this.state.modalOpen) {
            this.closeModal();
        } else {
            this.openModal();
        }
    }

    upload = async () => {
        if (this.validData()) {
            let file = this.state.file
            let title = this.state.title
            let year = this.state.year
            let medium = this.state.medium
            let name = file.name

            const storageRef = ref(storage, name);

            uploadBytes(storageRef, file).then(async (snapshot) => {
                console.log(snapshot)
                try {
                    const docRef = await addDoc(collection(db, "art"), {
                        filename: name,
                        title: title,
                        year: year,
                        medium: medium
                    });

                    console.log("Document written with ID: ", docRef.id);
                    this.closeModal()
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            });
        }
    }

    titleChanged = (e) => {
        this.setState({ title: e.target.value })
    }

    yearChanged = (e) => {
        this.setState({ year: e.target.value })
    }

    mediumChanged = (e) => {
        this.setState({ medium: e.target.value })
    }

    validField = (field) => {
        return field != "" && field != null
    }

    validData = () => {
        let file = this.state.file;
        let title = this.state.title;
        let year = this.state.year;
        let medium = this.state.medium;

        return this.validField(file) && this.validField(title)
            && this.validField(year) && this.validField(medium)
    }

    download = async () => {
        const querySnapshot = await getDocs(collection(db, "art"));
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let filename = data.filename;

            getDownloadURL(ref(storage, filename))
            .then((url) => {
                let images = this.state.images;
                images.push(url)
  
                this.setState({ images: images })
            })
            .catch((error) => {
              console.log(error)
            });
        });
    }

    render() {
        let valid = this.validData();
        let images = []

        for (var i = 0; i < this.state.images.length; i++) {
            let url = this.state.images[i]

            images.push(<img src={url} />)
        }

        return (
            <Fragment>
                <Button onClick={this.openModal}>Upload</Button>
                <Button onClick={this.download}>Download</Button>
                {images}

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Upload
                    </ModalHeader>
                    <ModalBody>
                        <Input type="file" onChange={this.imageChanged} className="m-2" />
                        <Input type="text" placeholder="Title" className="m-2" onChange={this.titleChanged} />
                        <Input type="number" placeholder="Year" className="m-2" onChange={this.yearChanged} />
                        <Input type="text" placeholder="Medium" className="m-2" onChange={this.mediumChanged} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.upload} color="primary" disabled={!this.validData()}>Upload</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default UploadButton;