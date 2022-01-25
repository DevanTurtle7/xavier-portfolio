import { Component } from 'react';
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
        let darkMode = this.props.darkMode === true;

        return (
            <div>
                <IconButton onClick={this.onClick} className="menu-btn" darkMode={this.props.darkMode}>
                    <MdMenu />
                </IconButton>
                <Menu open={this.state.open} onClose={this.onClose}/>
            </div>
        )
    }
}

export default MenuButton;