import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"

class Menu extends Component {
    render() {
        let classNames = "menu"
        classNames += this.props.open ? " menu-open" : " menu-closed"

        return (
            <div className={classNames}>
                <Col>
                    <IconButton onClick={this.props.onClose} className="menu-close-btn">
                        <MdClose />
                    </IconButton>
                    {this.props.children}
                </Col>
            </div>
        )
    }
}

export default Menu;