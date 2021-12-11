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
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

class MediaDisplay extends Component {
    render() {
        let data = this.props.data
        let title = data.title
        let url = data.url
        let type = this.props.type

        let mediaDisplay = (<div>invalid type</div>);

        if (type === "image") {
            mediaDisplay = (<img src={url} className="admin-media-display" alt="art" />)
        } else if (type === "video") {
            mediaDisplay = (<video controls className='admin-media-display'>
                <source src={url}/>
            </video>)
        }

        return (
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className="mb-4">
                    <CardHeader>
                        {title}
                    </CardHeader>
                    <CardBody>
                        <Row className="mx-auto">
                            {mediaDisplay}
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <EditButton data={data} />
                        <DeleteButton data={data} />
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default MediaDisplay;