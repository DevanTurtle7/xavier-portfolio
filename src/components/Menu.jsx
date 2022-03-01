/**
 * A modal that contains link to other pages on the site. A navigation menu.
 * 
 * Props:
 *  open: A boolean value that is true if the menu is open and false otherwise
 *  onClose: A function that runs after the menu is closed
 * 
 * @author Devan Kavalchek
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