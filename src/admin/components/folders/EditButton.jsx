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

    const openModal = () => setModalOpen(true)
    const toggleModal = () => setModalOpen(!modalOpen)

    const getItemRows = () => {
        let rows = []
        const items = props.content
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
                        key={i}
                    />
                )
            }

            rows.push(
                <FolderRowWrapper
                    numItems={numItems}
                    index={i}
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
                        <Button onClick={() => { }} color="primary" disabled={true}>Save</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditButton 