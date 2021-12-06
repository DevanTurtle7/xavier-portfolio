import { Component } from 'react';
import {
    Col,
} from 'reactstrap';
import UploadButton from './UploadButton';

class GalleryList extends Component {
    constructor(props) {
        super(props)

        this.db = this.props.db
        this.storage = this.props.storage
    }

    render() {
        return (
            <Col>
                <UploadButton db={this.db} storage={this.storage}/>
            </Col>
        )
    }
}

export default GalleryList;