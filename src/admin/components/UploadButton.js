import { Component, Fragment } from 'react';
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

import { collection, addDoc, updateDoc, doc, getDoc, increment } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

class UploadButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            modalOpen: false,
            description: "",
            uploading: false,
            progress: 0
        }

        this.storage = this.props.storage
        this.db = this.props.db
    }

    imageChanged = (e) => {
        console.log(e.target.files)
        let files = []

        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i]
            files.push(file)
        }

        this.setState({ files: files })
    }

    validFile = () => {
        let files = this.state.files

        if (files === []) {
            return true
        } else {
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                let tokens = file.type.split("/")
                let fileType = tokens[0]

                if (fileType !== "image" && fileType !== "video") {
                    return false
                }
            }

            return true
        }
    }

    openModal = () => {
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({
            file: null,
            modalOpen: false,
            description: "",
            uploading: false,
            progress: 0
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
        fetch("https://www.flickr.com/services/oauth/authorize&callback=localhost:3000")
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })
    }

    descriptionChanged = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        let valid = !this.state.uploading
        let validFileType = this.validFile()

        return (
            <Fragment>
                <Button onClick={this.openModal} color="primary" className="fit-content ms-3">Upload</Button>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Upload
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input
                                type="file"
                                onChange={this.imageChanged}
                                className="m-2"
                                invalid={!validFileType}
                                multiple
                            />
                            <FormFeedback>Invalid file type</FormFeedback>
                        </FormGroup>
                        <Input type="text" placeholder="Description" className="m-2" onChange={this.descriptionChanged} />
                    </ModalBody>
                    <ModalFooter>
                        <div className="upload-footer-row">
                            <Button onClick={this.upload} color="primary" disabled={!valid}>Upload</Button>
                            <p className='my-auto' hidden={!this.state.uploading}>Uploading {this.state.progress}% done</p>
                        </div>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default UploadButton;