import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import MenuLink from './MenuLink';
import Modal from './Modal';

class Menu extends Component {
    render() {
        let darkMode = this.props.darkMode === true

        return (
            <Modal open={this.props.open} onClose={this.props.onClose} darkMode={darkMode}>
                <Row className="d-flex align-content-center fullscreen-row">
                    <Col>
                        <MenuLink link='/art' label='art' darkMode={darkMode} />
                        <MenuLink link='/other' label='other' darkMode={darkMode} />
                        <MenuLink link='/contact' label='contact' darkMode={darkMode} />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default Menu;