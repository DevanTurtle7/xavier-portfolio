/**
 * 
 */

import { Col, Row } from 'reactstrap';

import MenuLink from './MenuLink';
import Modal from './Modal';

function Menu(props) {
    return (
        <Modal open={props.open} onClose={props.onClose} >
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

export default Menu;