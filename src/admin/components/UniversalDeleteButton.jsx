import {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {
  deleteDoc,
  doc,
  updateDoc,
  increment,
  getDocs,
  collection,
  getDoc,
} from 'firebase/firestore';

function UniversalDeleteButton(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const deleteFolder = async () => {
    setDeleting(true);
    const docId = props.docId;
    const db = props.db;
    const bucket = props.bucket;

    const docRef = doc(db, props.collection, docId);
    const currentSnap = await getDoc(docRef);
    const currentDoc = currentSnap.data();
    const countRef = doc(db, 'counts', props.collection);
    const querySnapshot = await getDocs(collection(db, props.collection));
    const type = currentDoc.type;
    const order = currentDoc.order;

    if (type !== 'text' && bucket !== null && bucket !== undefined) {
      const content = currentDoc.content;

      for (let i = 0; i < content.length; i++) {
        let current = currentDoc.content[i];

        if (current.type === 'image' || current.type === 'video') {
          const filename = current.filename;

          let params = {
            Bucket: 'xavier-portfolio',
            Key: filename,
          };

          bucket.deleteObject(params, (err, data) => {
            if (err) {
              console.log('there was an error');
              console.log(err);
            } else {
              console.log('Successfully deleted from bucket');
              console.log(data);
            }
          });
        }
      }
    }

    await deleteDoc(docRef);

    await updateDoc(countRef, {
      count: increment(-1),
    });

    // Update orders
    querySnapshot.forEach(async (docSnap) => {
      let currentOrder = docSnap.data().order;

      if (currentOrder > order) {
        let currentRef = doc(db, props.collection, docSnap.id);

        await updateDoc(currentRef, {
          order: currentOrder - 1,
        });
      }
    });

    props.onDelete();
    setDeleting(false);
    closeModal();
  };

  return (
    <>
      <Button color='danger' className='mx-2' onClick={openModal}>
        Delete
      </Button>
      <Modal isOpen={modalOpen} size='lg'>
        <ModalHeader toggle={toggleModal}>Are you sure?</ModalHeader>
        <ModalBody>
          <Button
            color='success'
            className='mx-2'
            onClick={deleteFolder}
            disabled={deleting}
          >
            Yes
          </Button>
          <Button color='danger' className='mx-2' onClick={closeModal}>
            No
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default UniversalDeleteButton;
