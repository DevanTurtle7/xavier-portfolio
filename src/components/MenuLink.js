import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import { Link } from "react-router-dom";

class MenuLink extends Component {
    render() {
        return (
            <Col className="d-flex justify-content-center m-2">
                <Link to={this.props.link} className="menu-link">{this.props.label}</Link>
            </Col>
        )
    }
}

export default MenuLink;