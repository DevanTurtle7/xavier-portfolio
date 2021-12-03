import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"
import MenuLink from './MenuLink';
import Modal from './Modal';

class Menu extends Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Row className="d-flex align-content-center fullscreen-row">
                    <Col>
                        <MenuLink link='/art' label='Art' />
                        <MenuLink link='/sketchbook' label='Sketchbook' />
                        <MenuLink link='/contact' label='Contact' />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default Menu;