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
    render() {
        let data = this.props.data

        return (
            <Fragment>
                <Button color="primary" className="mx-2" onClick={this.openModal}>Edit</Button>
            </Fragment>
        )
    }
}

export default TextEditButton;