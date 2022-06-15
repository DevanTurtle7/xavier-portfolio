/**
 * A link that is used in the navigation bar
 * 
 * Props:
 *  link: The url or path of the page that this link leads to
 *  label: The text that this link displays
 * 
 * @author Devan Kavalchek
 */

import { Link } from "react-router-dom";

function NavLink(props) {
    const getClassNames = () => {
        let classNames = "navigation-link"

        if (props.active) {
            classNames += " active"
        }

        return classNames
    }

    return (
        <Link to={props.link} className={getClassNames()}>{props.label}</Link>
    )
}

export default NavLink;