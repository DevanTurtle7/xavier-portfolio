import { Component } from 'react';
import {
    Button
} from 'reactstrap';
import Menu from './Menu';

class MenuButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    onClick = () => {
        this.setState({ open: true })
    }

    onClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <Button onClick={this.onClick}>Menu</Button>
                <Menu open={this.state.open} onClose={this.onClose}><p>This is some test</p></Menu>
            </div>
        )
    }
}

export default MenuButton;