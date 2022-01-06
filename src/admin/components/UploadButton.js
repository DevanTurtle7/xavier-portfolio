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
import { ref, uploadBytes } from "firebase/storage";

class UploadButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            modalOpen: false,
            title: "",
            year: null,
            description: "",
            uploading: false
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
            title: "",
            year: null,
            description: "",
            uploading: false
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

        if (this.validData() && this.validFile() && numFiles > 0) {
            let title = this.state.title
            let year = this.state.year
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

                await uploadBytes(storageRef, file).then(async (snapshot) => {
                    let contentType = snapshot.metadata.contentType
                    let tokens = contentType.split("/")
                    let fileType = tokens[0]

                    if (numFiles === 1) {
                        try {
                            let collectionRef = collection(this.db, "art")
                            let countRef = doc(this.db, "counts", "art")
                            let countSnap = await getDoc(countRef)
                            let size = countSnap.data().count

                            const docRef = await addDoc(collectionRef, {
                                filename: name,
                                type: fileType,
                                title: title,
                                year: year,
                                description: description,
                                order: size
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
                    } else {
                        let current = {filename: name, type: fileType}
                        content.push(current)

                        if (i === numFiles - 1) {
                            console.log("creating...")
                            try {
                                let collectionRef = collection(this.db, "art")
                                let countRef = doc(this.db, "counts", "art")
                                let countSnap = await getDoc(countRef)
                                let size = countSnap.data().count

                                const docRef = await addDoc(collectionRef, {
                                    type: "carousel",
                                    title: title,
                                    year: year,
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
                    }
                });
            }
        }
    }

    titleChanged = (e) => {
        this.setState({ title: e.target.value })
    }

    yearChanged = (e) => {
        this.setState({ year: e.target.value })
    }

    descriptionChanged = (e) => {
        this.setState({ description: e.target.value })
    }

    validField = (field) => {
        return field !== "" && field !== null
    }

    validData = () => {
        let title = this.state.title;
        let year = this.state.year;

        return this.validField(title) && this.validField(year)
    }

    render() {
        let valid = this.validData() && !this.state.uploading
        let validFileType = this.validFile()

        return (
            <Fragment>
                <Button onClick={this.openModal} color="primary" className="fit-content ms-3 me-2">Upload</Button>

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
                        <Input type="text" placeholder="Title" className="m-2" onChange={this.titleChanged} />
                        <Input type="number" placeholder="Year" className="m-2" onChange={this.yearChanged} />
                        <Input type="text" placeholder="Description" className="m-2" onChange={this.descriptionChanged} />
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