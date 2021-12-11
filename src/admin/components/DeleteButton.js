import { Component } from 'react';
import {
    Button,
} from 'reactstrap';

class DeleteButton extends Component {
    render() {
        return (
            <Button color="danger" className="mx-2">Delete</Button>
        )
    }
}

export default DeleteButton;