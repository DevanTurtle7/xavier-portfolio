import { Component } from 'react';
import {
    Button,
} from 'reactstrap';

class DeleteButton extends Component {

    onDelete = () => {
        this.props.onDelete()
    }

    render() {
        return (
            <Button color="danger" className="mx-2">Delete</Button>
        )
    }
}

export default DeleteButton;