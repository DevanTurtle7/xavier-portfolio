import {useState} from 'react';
import {MdModeEdit} from 'react-icons/md';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default function EditCreditsButton(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button onClick={openModal} color='primary' className='fit-content ms-3'>
        <MdModeEdit className='me-1 mb-1' />
        Edit Credits
      </Button>

      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>Edit Credits</ModalHeader>
        <ModalBody></ModalBody>
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
