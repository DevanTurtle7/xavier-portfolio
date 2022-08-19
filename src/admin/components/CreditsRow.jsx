import {Input, Row, Col} from 'reactstrap';
import FolderRowWrapper from './folders/folderRows/FolderRowWrapper';

export default function CreditsRow(props) {
  return (
    <FolderRowWrapper
      numItems={props.numItems}
      index={props.index}
      onMove={props.onMove}
    >
      <Row>
        <Col>
          <Input
            type='text'
            value={props.name}
            onChange={(e) => {
              props.nameChanged(e, props.index);
            }}
          />
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
    </FolderRowWrapper>
  );
}
