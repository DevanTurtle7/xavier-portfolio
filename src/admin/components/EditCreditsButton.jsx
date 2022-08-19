import {useState} from 'react';
import {MdModeEdit} from 'react-icons/md';
import {useSelector} from 'react-redux';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from 'reactstrap';
import {creditsSelector} from '../../shared/redux/selectors/credits_selector';
import CreditsRow from './CreditsRow';

export default function EditCreditsButton(props) {
  const creditsStore = useSelector(creditsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [credits, setCredits] = useState([]);

  const closeModal = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  const openModal = () => {
    setIsOpen(true);
    setCredits(creditsStore.map((credit) => credit));
  };

  const addCredit = () => {
    const creditsClone = credits.map((credit) => credit);
    creditsClone.push({name: '', link: ''});
    setCredits(creditsClone);
  };

  const nameChanged = (e, index) =>
    setCredits(
      credits.map(({name, link}, i) => {
        return {
          name: i === index ? e.target.value : name,
          link: link,
        };
      })
    );

  const linkChanged = (e, index) =>
    setCredits(
      credits.map(({name, link}, i) => {
        return {
          name: name,
          link: i === index ? e.target.value : link,
        };
      })
    );

  const onMove = (prevIndex, newIndex) => {
    const newCredits = [];

    for (let i = 0; i < credits.length; i++) {
      let current = credits[i];

      if (i !== prevIndex) {
        if (i === newIndex) {
          if (prevIndex < newIndex) {
            newCredits.push(current);
            newCredits.push(credits[prevIndex]);
          } else {
            newCredits.push(credits[prevIndex]);
            newCredits.push(current);
          }
        } else {
          newCredits.push(current);
        }
      }
    }

    setCredits(newCredits);
  };

  const validCredits = () => {
    let valid = true;

    credits.forEach(({name}) => {
      if (name.length === 0) {
        valid = false;
      }
    });

    return valid;
  };

  const onSave = () => {};

  return (
    <>
      <Button onClick={openModal} color='primary' className='fit-content ms-3'>
        <MdModeEdit className='me-1 mb-1' />
        Edit Credits
      </Button>

      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>Edit Credits</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <h6>Name</h6>
            </Col>
            <Col>
              <h6>Link</h6>
            </Col>
          </Row>
          {credits.map((credit, i) => (
            <CreditsRow
              name={credit.name}
              link={credit.link}
              index={i}
              numItems={credits.length}
              onMove={onMove}
              nameChanged={nameChanged}
              linkChanged={linkChanged}
              key={i + '_row'}
            />
          ))}
          <Button onClick={addCredit} color='primary'>
            Add
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} color='secondary'>
            Cancel
          </Button>
          <Button onClick={onSave} color='primary' disabled={!validCredits()}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
