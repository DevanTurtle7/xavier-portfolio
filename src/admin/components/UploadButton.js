import { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

class UploadButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
            modalOpen: false,
            title: "",
            year: null,
            medium: "",
            images: []
        }

        this.storage = this.props.storage
        this.db = this.props.db
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

            const storageRef = ref(this.storage, name);

            uploadBytes(storageRef, file).then(async (snapshot) => {
                console.log(snapshot)
                try {
                    const docRef = await addDoc(collection(this.db, "art"), {
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
        return field !== "" && field !== null
    }

    validData = () => {
        let file = this.state.file;
        let title = this.state.title;
        let year = this.state.year;
        let medium = this.state.medium;

        return this.validField(file) && this.validField(title)
            && this.validField(year) && this.validField(medium)
    }

    render() {
        let valid = this.validData()

        return (
            <Fragment>
                <Button onClick={this.openModal}>Upload</Button>

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
                        <Button onClick={this.upload} color="primary" disabled={!valid}>Upload</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default UploadButton;