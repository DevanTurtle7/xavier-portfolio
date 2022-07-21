import { useState } from "react";
import { MdFolder } from "react-icons/md";
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input } from "reactstrap";
import AddRow from "./folderRows/AddRow";
import MediaRow from "./folderRows/MediaRow";
import TextRow from "./folderRows/TextRow";
import FolderRowWrapper from "./folderRows/FolderRowWrapper";

function UploadFolderButton(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [valid, setValid] = useState(false)
    const [items, setItems] = useState([])

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
    }

    const onAdd = (type) => {
        if (type === "media") {
            addItem({ type: "media", filename: "" })
        } else if (type === "text") {
            addItem({ type: "text", content: "", size: 16 })
        }
    }

    const getItemRows = () => {
        let rows = []
        let numItems = items.length

        for (let i = 0; i < numItems; i++) {
            let current = items[i];
            let newRow;

            if (current.type === "media" || current.type === "video" || current.type === "image") {
                newRow = (<MediaRow current={current}/>)
            } else if (current.type === "text") {
                newRow = (<TextRow current={current}/>)
            }

            rows.push(<FolderRowWrapper numItems={numItems} index={i}>{newRow}</FolderRowWrapper>)
        }

        return rows
    }

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
                        <Input type="text" placeholder="Enter folder name" />
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