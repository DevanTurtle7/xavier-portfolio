import { Component } from 'react';
import {
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Row
} from 'reactstrap';

class GalleryList extends Component {
    render() {
        return (
            <Col xs={4}>
                <Card>
                    <CardHeader>
                        {this.props.title}
                    </CardHeader>
                    <CardBody>
                        <Row className="mx-auto">
                            <img src={this.props.url} className="admin-image-display" alt="art" />
                        </Row>
                    </CardBody>
                    <CardFooter>
                            <Button color="primary">Edit</Button>
                            <Button color="danger">Delete</Button>
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default GalleryList;