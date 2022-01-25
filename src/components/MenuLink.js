import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import { Link } from "react-router-dom";

class MenuLink extends Component {
    render() {
        let linkClassNames = "menu-link"

        if (this.props.darkMode) {
            linkClassNames += " dark-mode"
        }

        return (
            <Col className="d-flex justify-content-center m-2">
                <Link to={this.props.link} className={linkClassNames}>{this.props.label}</Link>
            </Col>
        )
    }
}

export default MenuLink;