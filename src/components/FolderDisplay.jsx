import { useState } from "react";
import Modal from "./Modal";

function FolderDisplay(props) {
    const [modalOpen, setModalOpen] = useState(false)

    const onClick = () => {
        setModalOpen(!modalOpen)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    return (
        <>
        <a onClick={onClick} className="folder-link">Folder</a>
        <Modal open={modalOpen} onClose={onClose}>

        </Modal>
        </>
    )
}

export default FolderDisplay;