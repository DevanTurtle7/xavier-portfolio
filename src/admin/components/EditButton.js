import { Component } from 'react';
import {
    Button,
} from 'reactstrap';

class EditButton extends Component {

    onEditSaved = () => {
        this.props.onEditSaved()
    }

    render() {
        return (
            <Button color="primary" className="mx-2">Edit</Button>
        )
    }
}

export default EditButton;