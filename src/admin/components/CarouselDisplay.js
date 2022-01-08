import { Component } from 'react';
import {
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Row
} from 'reactstrap';
import CarouselEditButton from './CarouselEditButton';
import DeleteButton from './DeleteButton';

class CarouselDisplay extends Component {
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
        let content = data.content
        let title = data.title
        let filename = data.filename
        let docId = data.docId
        let order = data.order
        let first = content[0]
        let type = first.type
        let url = first.url

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
                        {title} - <b>Carousel</b>
                    </CardHeader>
                    <CardBody>
                        <Row className="mx-auto">
                            {mediaDisplay}
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <CarouselEditButton
                            data={data}
                            mediaCount={this.props.mediaCount}
                            onEditSaved={this.updateData}
                            db={this.db}
                            storage={this.storage}
                        />
                        <DeleteButton
                            filename={filename}
                            docId={docId}
                            order={order}
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

export default CarouselDisplay;