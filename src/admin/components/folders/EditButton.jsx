import {useCallback, useMemo, useState} from 'react';
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import MediaRow from './folderRows/MediaRow';
import TextRow from './folderRows/TextRow';
import FolderRowWrapper from './folderRows/FolderRowWrapper';
import {collection, doc, updateDoc, getDocs, setDoc} from 'firebase/firestore';

function EditButton(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const validFolderName = useCallback(
    () => folderName.length > 0,
    [folderName]
  );

  const validOrder = useCallback(
    () => order.length !== 0 && order >= 0 && order < props.mediaCount,
    [order, props.mediaCount]
  );

  const valid = useMemo(() => {
    let isValid = true;

    for (let i = 0; i < items.length; i++) {
      const current = items[i];

      if (current.type === 'text') {
        if (current.content.length === 0 || current.size <= 0) {
          isValid = false;
          break;
        }
      }
    }

    return isValid && validFolderName() && validOrder();
  }, [validFolderName, validOrder, items]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const closeModal = () => setModalOpen(false);

  const openModal = () => {
    let newItems = [];

    for (let i = 0; i < props.content.length; i++) {
      const current = props.content[i];
      const type = current.type;

      if (type === 'image' || type === 'video') {
        newItems.push({
          type: type,
          filename: current.filename,
          url: current.url,
        });
      } else if (type === 'text') {
        newItems.push({
          content: current.content,
          type: type,
          size: current.size,
        });
      }
    }

    setItems(newItems);
    setFolderName(props.folderName);
    setOrder(props.order);
    setModalOpen(true);
  };

  const setItem = (index, item) => {
    let newItems = [];

    for (let i = 0; i < items.length; i++) {
      if (i !== index) {
        newItems.push(items[i]);
      } else {
        newItems.push(item);
      }
    }

    setItems(newItems);
  };

  const textSizeChanged = (index, size) => {
    let current = items[index];

    let newItem = {
      type: 'text',
      content: current.content,
      size: size,
    };

    setItem(index, newItem);
  };

  const textChanged = (index, text) => {
    let current = items[index];

    let newItem = {
      type: 'text',
      content: text,
      size: current.size,
    };

    setItem(index, newItem);
  };

  const onMove = (prevIndex, newIndex) => {
    if (prevIndex !== newIndex) {
      let newItems = [];

      for (let i = 0; i < items.length; i++) {
        let current = items[i];

        if (i !== prevIndex) {
          if (i === newIndex) {
            if (prevIndex < newIndex) {
              newItems.push(current);
              newItems.push(items[prevIndex]);
            } else {
              newItems.push(items[prevIndex]);
              newItems.push(current);
            }
          } else {
            newItems.push(current);
          }
        }
      }

      setItems(newItems);
    }
  };

  const getItemRows = () => {
    let rows = [];
    let numItems = items.length;

    for (let i = 0; i < numItems; i++) {
      let current = items[i];
      let newRow;

      if (
        current.type === 'media' ||
        current.type === 'video' ||
        current.type === 'image'
      ) {
        newRow = <MediaRow current={current} index={i} uploaded key={i} />;
      } else if (current.type === 'text') {
        newRow = (
          <TextRow
            current={current}
            index={i}
            sizeChanged={textSizeChanged}
            textChanged={textChanged}
            key={i}
          />
        );
      }

      rows.push(
        <FolderRowWrapper numItems={numItems} index={i} onMove={onMove} key={i}>
          {newRow}
        </FolderRowWrapper>
      );
    }

    return rows;
  };

  const folderNameChanged = (e) => {
    setFolderName(e.target.value);
  };

  const orderChanged = (e) => {
    setOrder(parseInt(e.target.value));
  };

  const save = () => {
    if (!saving && valid) {
      setSaving(true);

      getDocs(collection(props.db, props.collection))
        .then((querySnapshot) => {
          if (props.order !== order) {
            querySnapshot.forEach((docSnap) => {
              if (docSnap.id !== props.docId) {
                const data = docSnap.data();
                const docOrder = data.order;

                if (props.order > order) {
                  if (docOrder >= order && docOrder < props.order) {
                    const docRef = doc(props.db, props.collection, docSnap.id);
                    updateDoc(docRef, {
                      order: docOrder + 1,
                    });
                  }
                } else {
                  if (docOrder <= order && docOrder > props.order) {
                    const docRef = doc(props.db, props.collection, docSnap.id);
                    updateDoc(docRef, {
                      order: docOrder - 1,
                    });
                  }
                }
              }
            });
          }
        })
        .then(() => {
          const docRef = doc(props.db, props.collection, props.docId);
          const reducedItems = items.reduce((itemsAccumulator, item) => {
            const itemType = item.type;

            if (itemType === 'text') {
              return [...itemsAccumulator, item];
            } else if (itemType === 'video' || itemType === 'image') {
              return [
                ...itemsAccumulator,
                {
                  type: itemType,
                  filename: item.filename,
                },
              ];
            } else {
              return [...itemsAccumulator];
            }
          }, []);

          setDoc(
            docRef,
            {
              order: order,
              description: folderName,
              content: reducedItems,
            },
            {merge: true}
          ).then(() => {
            setSaving(false);
            closeModal();
            props.onUpdate();
          });
        });
    }
  };

  return (
    <>
      <Button color='primary' className='mx-2' onClick={openModal}>
        Edit
      </Button>

      <Modal isOpen={modalOpen} size='lg'>
        <ModalHeader toggle={toggleModal}>Edit Folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Folder Name</Label>
            <Input
              type='text'
              placeholder='Enter folder name'
              value={folderName}
              onChange={folderNameChanged}
              invalid={!validFolderName()}
            />
            <FormFeedback>Folder name cannot be empty</FormFeedback>
          </FormGroup>
          <FormGroup></FormGroup>
          <FormGroup>
            <Label>Order</Label>
            <Input
              type='number'
              value={order}
              onChange={orderChanged}
              invalid={!validOrder()}
            />
            <FormFeedback>
              Order must be between 0 and {props.mediaCount - 1}
            </FormFeedback>
          </FormGroup>
          {getItemRows()}
        </ModalBody>
        <ModalFooter>
          <div className='upload-add-row'>
            <Button onClick={closeModal} className='me-2'>
              Cancel
            </Button>
            <Button onClick={save} color='primary' disabled={!valid}>
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditButton;
