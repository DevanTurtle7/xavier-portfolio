import { useEffect, useState } from "react";
import { MdFolder } from "react-icons/md";
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, FormFeedback } from "reactstrap";
import AddRow from "./folderRows/AddRow";
import MediaRow from "./folderRows/MediaRow";
import TextRow from "./folderRows/TextRow";
import FolderRowWrapper from "./folderRows/FolderRowWrapper";

function UploadFolderButton(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [valid, setValid] = useState(false)
    const [validUpdate, setValidUpdate] = useState(true)
    const [items, setItems] = useState([])
    const [folderName, setFolderName] = useState("")

    const openModal = () => setModalOpen(true)
    const toggleModal = () => setModalOpen(!modalOpen)

    const upload = () => {

    }

    const addItem = (item) => {
        let newItems = []

        for (let i = 0; i < items.length; i++) {
            newItems.push(items[i])
        }

        newItems.push(item)
        setItems(newItems)
        setValidUpdate(true)
    }

    const removeItem = (index) => {
        let newItems = []

        for (let i = 0; i < items.length - 1; i++) {
            if (i < index) {
                newItems.push(items[i])
            } else {
                newItems.push(items[i + 1])
            }
        }

        setItems(newItems)
        setValidUpdate(true)
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
        setValidUpdate(true)
    }

    const onAdd = (type) => {
        if (type === "media") {
            addItem({ type: "media", file: null })
        } else if (type === "text") {
            addItem({ type: "text", content: "", size: 16 })
        }
    }

    const onMove = (prevIndex, newIndex) => {
        if (prevIndex !== newIndex) {
            let newItems = []

            for (let i = 0; i < items.length; i++) {
                let current = items[i]

                if (i !== prevIndex) {

                    if (i === newIndex) {
                        if (prevIndex < newIndex) {
                            newItems.push(current)
                            newItems.push(items[prevIndex])
                        } else {
                            newItems.push(items[prevIndex])
                            newItems.push(current)
                        }
                    } else {
                        newItems.push(current)
                    }
                }

            }

            setItems(newItems)
        }
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

    const fileChanged = (index, file, type) => {
        let current = {
            file: file,
            type: type
        }

        setItem(index, current)
    }

    const folderNameChanged = (e) => {
        setFolderName(e.target.value)
        setValidUpdate(true)
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
                        fileChanged={fileChanged}
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
                    onRemove={() => { removeItem(i) }}
                >
                    {newRow}
                </FolderRowWrapper>
            )
        }

        return rows
    }

    useEffect(() => {
        if (validUpdate) {
            console.log('updating valid')
            let isValid = true;

            if (folderName.length === 0 || items.length === 0) {
                isValid = false
            }

            for (let i = 0; i < items.length; i++) {
                const current = items[i]
                const type = current.type

                console.log(type)

                switch (type) {
                    case "media":
                        isValid = false;
                        break;
                    case "text":
                        if (current.size <= 0 || current.content.length === 0) {
                            isValid = false
                        }
                        break;
                    case "image":
                    case "video":
                        if (current.file === null) {
                            isValid = false
                        }
                        break;
                    default:
                        isValid = false;
                        break;
                }

                if (!isValid) { break }
            }

            console.log('valid: ' + isValid)
            setValidUpdate(false)
            setValid(isValid)
        }
    }, [validUpdate, setValidUpdate, valid, setValid])

    console.log(items)

    return (
        <>
            <Button onClick={openModal} color="primary" className="fit-content ms-2">
                <MdFolder className="me-1 mb-1" />
                Upload Folder
            </Button>

            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={toggleModal}>
                    Upload Folder
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Folder name</Label>
                        <Input type="text" placeholder="Enter folder name" onChange={folderNameChanged} invalid={folderName.length === 0} />
                        <FormFeedback>Folder must have a name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        {getItemRows()}
                        <AddRow onAdd={onAdd} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <div className="upload-add-row">
                        <Button onClick={upload} color="primary" disabled={!valid}>Upload</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UploadFolderButton