import { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';

class DeleteButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false
        }

        this.db = this.props.db
        this.storage = this.props.storage
    }

    delete = async () => {
        let docId = this.props.docId
        let filename = this.props.filename

        await deleteDoc(doc(this.db, "art", docId))
        await deleteObject(ref(this.storage, filename))
        this.props.onDelete()
    }

    openModal = () => {
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({ modalOpen: false })
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    render() {
        return (
            <Fragment>
                <Button color="danger" className="mx-2" onClick={this.openModal}>Delete</Button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggle}>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>
                        <Button color="success" className="mx-2" onClick={this.delete}>Yes</Button>
                        <Button color="danger" className="mx-2" onClick={this.closeModal}>No</Button>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default DeleteButton;