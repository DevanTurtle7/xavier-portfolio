import { Component } from 'react';
import {
    Col,
    Card,
    CardBody,
    CardFooter,
    Row
} from 'reactstrap';
import TextEditButton from './TextEditButton';
import DeleteButton from './DeleteButton';

class TextDisplay extends Component {
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
        let docId = data.docId
        let order = data.order

        return (
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className="mb-4">
                    <CardBody className='text-display'>
                        <Row className="mx-auto">
                            <p className='admin-text-display'>{content}</p>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <TextEditButton
                            data={data}
                            mediaCount={this.props.mediaCount}
                            onEditSaved={this.updateData}
                            db={this.db}
                            storage={this.storage}
                            collection={this.props.collection}
                        />
                        <DeleteButton
                            files={content}
                            docId={docId}
                            order={order}
                            onDelete={this.updateData}
                            db={this.db}
                            storage={this.storage}
                            collection={this.props.collection}
                        />
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default TextDisplay;