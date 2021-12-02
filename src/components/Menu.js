import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"
import { NavLink } from "react-router-dom";

class Menu extends Component {
    render() {
        let classNames = "menu"
        classNames += this.props.open ? " menu-open" : " menu-closed"

        return (
            <div className={classNames}>
                <IconButton onClick={this.props.onClose} className="menu-close-btn">
                    <MdClose />
                </IconButton>

                <Col>
                    <NavLink className="navbar-brand" to="/gallery">
                        Gallery
                    </NavLink>
                    <NavLink className="navbar-brand" to="/other">
                        Other
                    </NavLink>
                    <NavLink className="navbar-brand" to="/contact">
                        Contact
                    </NavLink>
                </Col>
            </div>
        )
    }
}

export default Menu;