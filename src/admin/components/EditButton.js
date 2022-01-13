import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    FormGroup,
    FormFeedback,
} from 'reactstrap';

class EditButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            description: "",
            order: "",
            updating: false
        }

        this.db = this.props.db
    }

    saveChanges = async () => {
        this.setState({ updating: true })
        const querySnapshot = await getDocs(collection(this.db, "art"));
        let oldOrder = this.props.data.order
        let newOrder = this.state.order

        // Update orders
        if (oldOrder > newOrder) {
            querySnapshot.forEach(async (docSnap) => {
                const currentOrder = docSnap.data().order

                if (currentOrder >= newOrder && currentOrder < oldOrder) {
                    const currentRef = doc(this.db, "art", docSnap.id)

                    await updateDoc(currentRef, {
                        order: currentOrder + 1
                    })
                }
            })
        } else if (oldOrder < newOrder) {
            querySnapshot.forEach(async (docSnap) => {
                const currentOrder = docSnap.data().order

                if (currentOrder > oldOrder && currentOrder <= newOrder) {
                    const currentRef = doc(this.db, "art", docSnap.id)

                    await updateDoc(currentRef, {
                        order: currentOrder - 1
                    })
                }
            })
        }

        let docId = this.props.data.docId
        let docRef = doc(this.db, "art", docId)

        await updateDoc(docRef, {
            description: this.state.description,
            order: this.state.order
        })

        this.closeModal()
        this.props.onEditSaved()
    }

    openModal = () => {
        let data = this.props.data

        this.setState({
            modalOpen: true,
            description: data.description,
            order: data.order,
            updating: false
        })
    }

    closeModal = () => {
        this.setState({ modalOpen: false, updating: false })
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    descriptionChanged = (e) => {
        this.setState({ description: e.target.value })
    }

    orderChanged = (e) => {
        this.setState({ order: parseInt(e.target.value) })
    }

    validOrder = () => {
        return this.state.order < this.props.mediaCount && this.state.order >= 0
    }

    validField = (field) => {
        return field !== "" && field !== null
    }

    validData = () => {
        return this.validField(this.state.order) &&
            this.validOrder()
    }

    render() {
        let data = this.props.data
        let description = data.description
        let order = data.order
        let valid = this.validData() && !this.state.updating
        let validOrderInput = this.validOrder()

        return (
            <Fragment>
                <Button color="primary" className="mx-2" onClick={this.openModal}>Edit</Button>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggle}>
                    Edit
                    </ModalHeader>
                    <ModalBody>
                        <Label>Description</Label>
                        <Input type="text" defaultValue={description} onChange={this.descriptionChanged} />
                        <FormGroup>
                            <Label>Order</Label>
                            <Input type="number" defaultValue={order} onChange={this.orderChanged} invalid={!validOrderInput}/>
                            <FormFeedback>
                                Order must be between 0 and {this.props.mediaCount - 1}
                            </FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button color="primary" disabled={!valid} onClick={this.saveChanges}>Save</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default EditButton;