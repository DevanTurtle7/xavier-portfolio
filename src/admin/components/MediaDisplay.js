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

class MediaDisplay extends Component {
    render() {
        let clubData = this.props.clubData
        let title = clubData.title
        let url = clubData.url
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
            <Col xs={4}>
                <Card>
                    <CardHeader>
                        {title}
                    </CardHeader>
                    <CardBody>
                        <Row className="mx-auto">
                            {mediaDisplay}
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <EditButton clubData={clubData} />
                        <Button color="danger">Delete</Button>
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default MediaDisplay;