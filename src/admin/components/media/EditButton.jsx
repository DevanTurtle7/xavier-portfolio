import {doc, updateDoc, getDocs, collection, setDoc} from 'firebase/firestore';
import {Component, Fragment} from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  FormGroup,
  FormFeedback,
} from 'reactstrap';
import CarouselItem from './CarouselItem';

class EditButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      modalOpen: false,
      description: '',
      order: '',
      link: '',
      updating: false,
    };

    this.db = this.props.db;
  }

  saveChanges = async () => {
    this.setState({updating: true});
    const querySnapshot = await getDocs(
      collection(this.db, this.props.collection)
    );
    let oldOrder = this.props.data.order;
    let newOrder = this.state.order;

    // Update orders
    if (oldOrder > newOrder) {
      querySnapshot.forEach(async (docSnap) => {
        const currentOrder = docSnap.data().order;

        if (currentOrder >= newOrder && currentOrder < oldOrder) {
          const currentRef = doc(this.db, this.props.collection, docSnap.id);

          await updateDoc(currentRef, {
            order: currentOrder + 1,
          });
        }
      });
    } else if (oldOrder < newOrder) {
      querySnapshot.forEach(async (docSnap) => {
        const currentOrder = docSnap.data().order;

        if (currentOrder > oldOrder && currentOrder <= newOrder) {
          const currentRef = doc(this.db, this.props.collection, docSnap.id);

          await updateDoc(currentRef, {
            order: currentOrder - 1,
          });
        }
      });
    }

    let docId = this.props.data.docId;
    let docRef = doc(this.db, this.props.collection, docId);
    let link = this.state.link ?? '';
    let content = this.state.content.reduce(
      (contentAccumulator, current) => [
        ...contentAccumulator,
        {filename: current.filename, type: current.type},
      ],
      []
    );

    await setDoc(
      docRef,
      {
        description: this.state.description,
        order: this.state.order,
        content: content,
        link: link,
      },
      {merge: true}
    );

    this.closeModal();
    this.props.onEditSaved();
  };

  openModal = () => {
    let data = this.props.data;

    this.setState({
      content: data.content,
      modalOpen: true,
      description: data.description,
      order: data.order,
      updating: false,
      link: data.link,
    });
  };

  closeModal = () => {
    this.setState({modalOpen: false, updating: false});
  };

  toggle = () => {
    this.setState({modalOpen: !this.state.modalOpen});
  };

  descriptionChanged = (e) => {
    this.setState({description: e.target.value});
  };

  linkChanged = (e) => {
    this.setState({link: e.target.value});
  };

  orderChanged = (e) => {
    this.setState({order: parseInt(e.target.value)});
  };

  validOrder = () => {
    return this.state.order < this.props.mediaCount && this.state.order >= 0;
  };

  validField = (field) => {
    return field !== '' && field !== null;
  };

  validData = () => {
    return this.validField(this.state.order) && this.validOrder();
  };

  changeOrder = (currentIndex, newIndex) => {
    let content = this.state.content;
    let current = content.splice(currentIndex, 1)[0]; // Remove the item
    content.splice(newIndex, 0, current); // Insert the item at the new index

    this.setState({content: content});
  };

  render() {
    let data = this.props.data;
    let description = data.description;
    let link = data.link;
    let order = data.order;
    let valid = this.validData() && !this.state.updating;
    let validOrderInput = this.validOrder();
    let content = this.state.content;
    let numItems = content.length;
    let carouselOrganizer = null;

    if (numItems > 1) {
      let items = [];

      for (let i = 0; i < numItems; i++) {
        let current = content[i];

        items.push(
          <CarouselItem
            url={current.url}
            type={current.type}
            index={i}
            numItems={numItems}
            callback={this.changeOrder}
            key={i}
          />
        );

        carouselOrganizer = <div className='carousel-items-row'>{items}</div>;
      }
    }

    return (
      <Fragment>
        <Button color='primary' className='mx-2' onClick={this.openModal}>
          Edit
        </Button>

        <Modal isOpen={this.state.modalOpen} size='lg'>
          <ModalHeader toggle={this.toggle}>Edit Media</ModalHeader>
          <ModalBody>
            {carouselOrganizer}

            <Label>Description</Label>
            <Input
              type='textarea'
              defaultValue={description}
              onChange={this.descriptionChanged}
            />
            <Label>Link</Label>
            <Input
              type='text'
              placeholder='Link'
              defaultValue={link}
              onChange={this.linkChanged}
            />
            <FormGroup>
              <Label>Order</Label>
              <Input
                type='number'
                defaultValue={order}
                onChange={this.orderChanged}
                invalid={!validOrderInput}
              />
              <FormFeedback>
                Order must be between 0 and {this.props.mediaCount - 1}
              </FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button
              color='primary'
              disabled={!valid}
              onClick={this.saveChanges}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default EditButton;
