/**
 * A header bar that contains navigation including the artists name and the
 * navigation menu. Also contains the component that animates the page's
 * <title> attribute.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { Fragment } from 'react';

import NavLink from './NavLink';

function Footer(props) {
    return (
        <div className="navbar-footer">
            <div className="nav-items">
                <NavLink label="contact" link="/contact" active={props.tag === "contact"} />
                <NavLink label="credit" link="/credit" active={props.tag == "credit"} />
            </div>
        </div>
    )
}

export default Footer;