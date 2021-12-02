import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuCloseButton from './MenuCloseButton';

class Menu extends Component {
    render() {
        let classNames = "menu"
        classNames += this.props.open ? " menu-open" : " menu-closed"

        return (
            <div className={classNames}>
                <Col>
                    <MenuCloseButton onClick={this.props.onClose}/>
                    {this.props.children}
                </Col>
            </div>
        )
    }
}

export default Menu;