import { Col, Card, CardBody, Row, CardFooter, Button } from "reactstrap"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

function FolderDisplay(props) {
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
                    <Button>Delete</Button>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default FolderDisplay