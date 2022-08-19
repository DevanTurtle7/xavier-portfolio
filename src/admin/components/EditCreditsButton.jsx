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
      credits.map((credit, i) => {
        return {
          name: i === index ? e.target.value : credit.name,
          link: credit.link,
        };
      })
    );

  const linkChanged = (e, index) =>
    setCredits(
      credits.map((credit, i) => {
        return {
          name: credit.name,
          link: i === index ? e.target.value : credit.link,
        };
      })
    );

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
              onMove={() => {}}
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
          <Button onClick={() => {}} color='primary'>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
