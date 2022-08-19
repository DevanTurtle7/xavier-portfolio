import {Input, Col, Container, FormGroup, FormFeedback, Row} from 'reactstrap';
import FolderRowWrapper from '../folders/folderRows/FolderRowWrapper';

export default function CreditsRow(props) {
  return (
    <FolderRowWrapper
      numItems={props.numItems}
      index={props.index}
      onMove={props.onMove}
      onRemove={() => {
        props.onRemove(props.index);
      }}
      canDelete
    >
      <Container>
        <Row>
          <Col>
            <FormGroup>
              <Input
                type='text'
                value={props.name}
                onChange={(e) => {
                  props.nameChanged(e, props.index);
                }}
                invalid={props.name.length === 0}
              />
              <FormFeedback>Name cannot be empty</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <Input
              type='text'
              value={props.link}
              onChange={(e) => {
                props.linkChanged(e, props.index);
              }}
            />
          </Col>
        </Row>
      </Container>
    </FolderRowWrapper>
  );
}
