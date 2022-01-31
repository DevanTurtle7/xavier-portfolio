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

class TextEditButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            text: "",
            updating: false,
            validText: true
        }

        this.db = this.props.db
    }

    openModal = () => {
        this.setState({
            modalOpen: true,
            text: "",
            validText: true
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

    saveChanges = () => {

    }

    render() {
        let data = this.props.data
        let text = data.content
        let validText = this.state.validText
        let valid = !this.state.uploading && validText

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

                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={this.closeModal}>Cancel</Button>
                            <Button onClick={this.saveChanges} color="primary" disabled={!valid}>Upload</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default TextEditButton;