import { Component } from 'react';
import {
    Button
} from 'reactstrap';
import IconButton from './IconButton';
import Menu from './Menu';
import { MdMenu } from "react-icons/md"

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
                <IconButton onClick={this.onClick} className="menu-btn">
                    <MdMenu />
                </IconButton>
                <Menu open={this.state.open} onClose={this.onClose}><p>This is some test</p></Menu>
            </div>
        )
    }
}

export default MenuButton;