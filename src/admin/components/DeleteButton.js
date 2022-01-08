import { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { deleteDoc, doc, updateDoc, increment, getDocs, collection } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';

class DeleteButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            deleting: false
        }

        this.db = this.props.db
        this.storage = this.props.storage
    }

    delete = async () => {
        this.setState({deleting: true})
        let docId = this.props.docId
        let filename = this.props.filename
        let order = this.props.order
        let countRef = doc(this.db, "counts", "art")
        const querySnapshot = await getDocs(collection(this.db, "art"));

        await deleteDoc(doc(this.db, "art", docId))
        await deleteObject(ref(this.storage, filename))

        await updateDoc(countRef, {
            count: increment(-1)
        })

        // Update orders
        querySnapshot.forEach(async (docSnap) => {
            let currentOrder = docSnap.data().order

            if (currentOrder > order) {
                let currentRef = doc(this.db, "art", docSnap.id)

                await updateDoc(currentRef, {
                    order: currentOrder - 1
                })
            }
        })

        this.props.onDelete()
        this.setState({deleting: false})
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
                        <Button color="success" className="mx-2" onClick={this.delete} disabled={this.state.deleting}>Yes</Button>
                        <Button color="danger" className="mx-2" onClick={this.closeModal}>No</Button>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default DeleteButton;