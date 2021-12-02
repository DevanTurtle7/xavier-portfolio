import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"
import { Link } from "react-router-dom";

class MenuLink extends Component {
    render() {
        return (
            <Col className="d-flex justify-content-center">
                <Link to={this.props.link} className="menu-link">{this.props.label}</Link>
            </Col>
        )
    }
}

export default MenuLink;