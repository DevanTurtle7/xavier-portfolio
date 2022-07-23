import { Col, Card, CardBody, CardFooter, Button } from "reactstrap"
import UniversalDeleteButton from "../UniversalDeleteButton"

function FolderDisplay(props) {

    const onUpdate = () => props.onUpdate()

    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="mb-4">
                <CardBody>
                <div className="admin-folder-display-body">
                        <p><b>Folder</b></p>
                        <p>{props.folderName}</p>
                </div>
                </CardBody>
                <CardFooter>
                    <Button>
                        Edit
                    </Button>
                    <UniversalDeleteButton
                        docId={props.docId}
                        db={props.db}
                        bucket={props.bucket}
                        collection={props.collection}
                        onDelete={onUpdate}
                    />
                </CardFooter>
            </Card>
        </Col>
    )
}

export default FolderDisplay