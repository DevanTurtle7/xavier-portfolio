import { useEffect, useState } from "react";
import { MdFolder } from "react-icons/md";
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, FormFeedback } from "reactstrap";
import AddRow from "./folderRows/AddRow";
import MediaRow from "./folderRows/MediaRow";
import TextRow from "./folderRows/TextRow";
import FolderRowWrapper from "./folderRows/FolderRowWrapper";
import { collection, getDoc, doc, addDoc, updateDoc, increment } from "firebase/firestore";

function EditButton(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [items, setItems] = useState([])
    const [valid, setValid] = useState(false)

    useEffect(() => {
        let isValid = true;

        for (let i = 0; i < items.length; i++) {
            const current = items[i]

            if (current.type === "text") {
                if (current.content.length === 0 || current.size <= 0) {
                    isValid = false;
                    break;
                }
            }
        }

        setValid(isValid)
    })

    const toggleModal = () => setModalOpen(!modalOpen)

    const openModal = () => {
        let newItems = []

        for (let i = 0; i < props.content.length; i++) {
            const current = props.content[i]
            const type = current.type

            if (type === "image" || type === "video") {
                newItems.push({
                    type: type,
                    url: current.url
                })
            } else if (type === "text") {
                newItems.push({
                    content: current.content,
                    type: type,
                    size: current.size
                })
            }
        }

        setItems(newItems)
        console.log(newItems)
        setModalOpen(true)
    }

    const setItem = (index, item) => {
        let newItems = []

        for (let i = 0; i < items.length; i++) {
            if (i !== index) {
                newItems.push(items[i])
            } else {
                newItems.push(item)
            }
        }

        setItems(newItems)
    }

    const textSizeChanged = (index, size) => {
        let current = items[index]

        let newItem = {
            type: "text",
            content: current.content,
            size: size
        }

        setItem(index, newItem)
    }

    const textChanged = (index, text) => {
        let current = items[index]

        let newItem = {
            type: "text",
            content: text,
            size: current.size
        }

        setItem(index, newItem)
    }

    const onMove = (prevIndex, newIndex) => {

    }

    const getItemRows = () => {
        let rows = []
        let numItems = items.length

        for (let i = 0; i < numItems; i++) {
            let current = items[i];
            let newRow;

            if (current.type === "media" || current.type === "video" || current.type === "image") {
                newRow = (
                    <MediaRow
                        current={current}
                        index={i}
                        uploaded
                        key={i}
                    />
                )
            } else if (current.type === "text") {
                newRow = (
                    <TextRow
                        current={current}
                        index={i}
                        sizeChanged={textSizeChanged}
                        textChanged={textChanged}
                        key={i}
                    />
                )
            }

            rows.push(
                <FolderRowWrapper
                    numItems={numItems}
                    index={i}
                    onMove={onMove}
                    key={i}
                >
                    {newRow}
                </FolderRowWrapper>
            )
        }

        return rows
    }

    return (
        <>
            <Button color="primary" className="mx-2" onClick={openModal}>Edit</Button>

            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={toggleModal}>
                    Edit Folder
                </ModalHeader>
                <ModalBody>
                    {getItemRows()}
                </ModalBody>
                <ModalFooter>
                    <div className="upload-add-row">
                        <Button onClick={() => { }} color="primary" disabled={!valid}>Save</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditButton 