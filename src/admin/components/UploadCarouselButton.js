import { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

import { collection, addDoc, updateDoc, doc, getDoc, increment } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

class UploadCarouselButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
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
        const file = e.target.files[0]
        console.log(e.target.files)
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

        if (this.validData()) {
            let file = this.state.file
            let title = this.state.title
            let year = this.state.year
            let description = this.state.description

            // Generate unique name
            let tokens = file.name.split(".")
            let numTokens = tokens.length
            let filetype = tokens[numTokens-1]
            let time = new Date().getTime()
            let name = ""

            for (let i = 0; i < numTokens - 1; i++) {
                name += tokens[i]
            }

            name += "_" + time + "." + filetype

            const storageRef = ref(this.storage, name);

            uploadBytes(storageRef, file).then(async (snapshot) => {
                let contentType = snapshot.metadata.contentType
                let tokens = contentType.split("/")
                let fileType = tokens[0]

                if (fileType === "image" || fileType === "video") {
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
                    console.log("File is not an image or video")
                    this.closeModal()
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

    descriptionChanged = (e) => {
        this.setState({ description: e.target.value })
    }

    validField = (field) => {
        return field !== "" && field !== null
    }

    validData = () => {
        let file = this.state.file;
        let title = this.state.title;
        let year = this.state.year;

        return this.validField(file) && this.validField(title)
            && this.validField(year)
    }

    render() {
        let valid = this.validData() && !this.state.uploading

        return (
            <Fragment>
                <Button onClick={this.openModal} color="primary" className="fit-content mx-3">Upload Carousel</Button>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Upload Carousel
                    </ModalHeader>
                    <ModalBody>
                        <Input type="file" onChange={this.imageChanged} className="m-2" />
                        <Input type="text" placeholder="Title" className="m-2" onChange={this.titleChanged} />
                        <Input type="number" placeholder="Year" className="m-2" onChange={this.yearChanged} />
                        <Input type="text" placeholder="description" className="m-2" onChange={this.descriptionChanged} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.upload} color="primary" disabled={!valid}>Upload</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default UploadCarouselButton;