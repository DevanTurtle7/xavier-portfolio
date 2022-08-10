import { Component } from 'react';
import {
    Col,
    Card,
    CardBody,
    CardFooter,
    Row
} from 'reactstrap';
import TextEditButton from './TextEditButton';
import UniversalDeleteButton from '../UniversalDeleteButton';

class TextDisplay extends Component {
    constructor(props) {
        super(props)

        this.db = this.props.db
    }

    updateData = () => {
        this.props.onUpdate()
    }

    render() {
        let data = this.props.data
        let content = data.content
        let docId = data.docId

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
                            collection={this.props.collection}
                        />
                        <UniversalDeleteButton
                            docId={docId}
                            db={this.db}
                            collection={this.props.collection}
                            onDelete={this.updateData}
                        />
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}

export default TextDisplay;