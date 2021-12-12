import { Component } from 'react';
import {
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Row
} from 'reactstrap';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

class MediaDisplay extends Component {
    constructor(props) {
        super(props)

        this.db = this.props.db
        this.storage = this.props.storage
    }

    updateData = () => {
        this.props.onUpdate()
    }

    render() {
        let data = this.props.data
        let type = this.props.type
        let title = data.title
        let url = data.url
        let filename = data.filename
        let docId = data.docId

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
                        <EditButton
                            data={data}
                            onEditSaved={this.updateData}
                            db={this.db}
                            storage={this.storage}
                        />
                        <DeleteButton
                            filename={filename}
                            docId={docId}
                            onDelete={this.updateData}
                            db={this.db}
                            storage={this.storage}
                        />
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default MediaDisplay;