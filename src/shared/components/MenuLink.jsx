/**
 * A link that is used in the navigation menu
 * 
 * Props:
 *  link: The url or path of the page that this link leads to
 *  label: The text that this link displays
 * 
 * @author Devan Kavalchek
 */

import { Col } from 'reactstrap';
import { Link } from "react-router-dom";

function MenuLink(props) {
    return (
        <Col className="d-flex justify-content-center m-2">
            <Link to={props.link} className="menu-link">{props.label}</Link>
        </Col>
    )
}

export default MenuLink;