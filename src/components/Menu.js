import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import MenuLink from './MenuLink';
import Modal from './Modal';

class Menu extends Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Row className="d-flex align-content-center fullscreen-row">
                    <Col>
                        <MenuLink link='/art' label='art' />
                        <MenuLink link='/other' label='other' />
                        <MenuLink link='/contact' label='contact' />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default Menu;