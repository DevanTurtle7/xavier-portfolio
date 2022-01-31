import { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    FormFeedback,
    Label
} from 'reactstrap';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';

class TextEditButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            text: "",
            updating: false,
            validText: true,
            order: ""
        }

        this.db = this.props.db
    }

    openModal = () => {
        let data = this.props.data

        this.setState({
            modalOpen: true,
            text: data.content,
            validText: true,
            order: data.order
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
        })
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    textChanged = (e) => {
        let text = e.target.value
        let valid = text !== ""

        this.setState({
            text: text,
            validText: valid
        })
    }

    orderChanged = (e) => {
        this.setState({ order: parseInt(e.target.value) })
    }

    validOrder = () => {
        return this.state.order < this.props.mediaCount && this.state.order >= 0
    }

    saveChanges = async () => {
        let validText = this.state.validText
        let validOrderInput = this.validOrder()
        let valid = !this.state.updating && validText && validOrderInput

        if (valid) {
            this.setState({ updating: true })
            const querySnapshot = await getDocs(collection(this.db, this.props.collection));
            let oldOrder = this.props.data.order
            let newOrder = this.state.order

            // Update orders
            if (oldOrder > newOrder) {
                querySnapshot.forEach(async (docSnap) => {
                    const currentOrder = docSnap.data().order

                    if (currentOrder >= newOrder && currentOrder < oldOrder) {
                        const currentRef = doc(this.db, this.props.collection, docSnap.id)

                        await updateDoc(currentRef, {
                            order: currentOrder + 1
                        })
                    }
                })
            } else if (oldOrder < newOrder) {
                querySnapshot.forEach(async (docSnap) => {
                    const currentOrder = docSnap.data().order

                    if (currentOrder > oldOrder && currentOrder <= newOrder) {
                        const currentRef = doc(this.db, this.props.collection, docSnap.id)

                        await updateDoc(currentRef, {
                            order: currentOrder - 1
                        })
                    }
                })
            }

            let docId = this.props.data.docId
            let docRef = doc(this.db, this.props.collection, docId)
            let content = this.state.text
            let order = this.state.order

            await updateDoc(docRef, {
                order: order,
                content: content
            })

            this.closeModal()
            this.props.onEditSaved()
        }
    }

    render() {
        let data = this.props.data
        let text = data.content
        let validText = this.state.validText
        let order = data.order
        let validOrderInput = this.validOrder()
        let valid = !this.state.updating && validText && validOrderInput

        return (
            <Fragment>
                <Button color="primary" className="mx-2" onClick={this.openModal}>Edit</Button>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Text
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input
                                type="textarea"
                                defaultValue={text}
                                onChange={this.textChanged}
                                invalid={!validText}
                            />
                            <FormFeedback>Text cannot be empty</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Order</Label>
                            <Input type="number" defaultValue={order} onChange={this.orderChanged} invalid={!validOrderInput} />
                            <FormFeedback>
                                Order must be between 0 and {this.props.mediaCount - 1}
                            </FormFeedback>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button onClick={this.saveChanges} color="primary" disabled={!valid}>Save</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default TextEditButton;