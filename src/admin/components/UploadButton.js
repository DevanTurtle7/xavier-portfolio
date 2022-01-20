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
        this.setState({ uploading: true })
        let files = this.state.files
        let numFiles = files.length

        if (this.validFile() && numFiles > 0) {
            let description = this.state.description
            let content = []

            // Generate unique name
            for (let i = 0; i < numFiles; i++) {
                let file = files[i]
                let tokens = file.name.split(".")
                let numTokens = tokens.length
                let filetype = tokens[numTokens - 1]
                let time = new Date().getTime()
                let name = ""

                for (let i = 0; i < numTokens - 1; i++) {
                    name += tokens[i]
                }

                name += "_" + time + "." + filetype

                const storageRef = ref(this.storage, name);

                const uploadTask = uploadBytesResumable(storageRef, file)

                uploadTask.on('state_changed', (snapshot) => {
                    let progress;
                    let currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    if (numFiles === 1) {
                        progress = currentProgress
                    } else {
                        let percentPer = 100 / (numFiles)
                        let completed = i * percentPer
                        progress = completed + (currentProgress / numFiles)
                    }

                    progress = progress.toFixed(1)

                    this.setState({ progress: progress })
                })

                await uploadTask.then(async (snapshot) => {
                    let contentType = snapshot.metadata.contentType
                    let tokens = contentType.split("/")
                    let fileType = tokens[0]

                    let current = { filename: name, type: fileType }
                    content.push(current)

                    if (i === numFiles - 1) {
                        console.log("creating...")
                        try {
                            let collectionRef = collection(this.db, "art")
                            let countRef = doc(this.db, "counts", "art")
                            let countSnap = await getDoc(countRef)
                            let size = countSnap.data().count

                            const docRef = await addDoc(collectionRef, {
                                description: description,
                                order: size,
                                content: content
                            })

                            await updateDoc(countRef, {
                                count: increment(1)
                            })

                            console.log("Document written with ID: ", docRef.id);
                            this.closeModal()
                            this.props.onUpload()
                        } catch (e) {
                            console.error("Error adding document: ", e);
                            this.setState({ uploading: false })
                        }
                    }
                });
            }
        }
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