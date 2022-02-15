import { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { deleteDoc, doc, updateDoc, increment, getDocs, collection } from "firebase/firestore";

class DeleteButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            deleting: false
        }

        this.db = this.props.db
    }

    delete = async () => {
        this.setState({deleting: true})
        let docId = this.props.docId
        let order = this.props.order
        let files = this.props.files
        let countRef = doc(this.db, "counts", this.props.collection)
        const querySnapshot = await getDocs(collection(this.db, this.props.collection));
        let bucket = this.props.bucket

        await deleteDoc(doc(this.db, this.props.collection, docId))

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let filename = current.filename
            
            let params = {
                Bucket: 'xavier-portfolio',
                Key: filename
            }

            bucket.deleteObject(params, (err, data) => {
                if (err) {
                    console.log('there was an error')
                    console.log(err)
                } else {
                    console.log('data')
                }
            })
        }

        await updateDoc(countRef, {
            count: increment(-1)
        })

        // Update orders
        querySnapshot.forEach(async (docSnap) => {
            let currentOrder = docSnap.data().order

            if (currentOrder > order) {
                let currentRef = doc(this.db, this.props.collection, docSnap.id)

                await updateDoc(currentRef, {
                    order: currentOrder - 1
                })
            }
        })
        console.log(1)

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