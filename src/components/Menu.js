import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"
import MenuLink from './MenuLink';

class Menu extends Component {
    render() {
        let classNames = "menu"
        classNames += this.props.open ? " menu-open" : " menu-closed"

        return (
            <div className={classNames}>
                <IconButton onClick={this.props.onClose} className="menu-close-btn">
                    <MdClose />
                </IconButton>

                <Row className="d-flex align-content-center menu-row">
                    <Col>
                        <MenuLink link='/gallery' label='Gallery' />
                        <MenuLink link='/contact' label='Contact' />
                        <MenuLink link='/other' label='Other' />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Menu;