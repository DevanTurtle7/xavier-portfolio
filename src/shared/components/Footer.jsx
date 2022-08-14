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

import NavLink from './NavLink';

function Footer(props) {
    return (
        <div className="navbar-footer">
            <div className="nav-items">
                <NavLink label="contact" link="/contact" active={props.tag === "contact"} />
                <NavLink label="credits" link="/credits" active={props.tag === "credits"} />
            </div>
        </div>
    )
}

export default Footer;