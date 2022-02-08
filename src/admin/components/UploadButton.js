import React, { useState } from 'react';
import AWS from 'aws-sdk'
import { getAccesKey, getSecretKey } from '../Credentials';
import { Component, Fragment } from 'react';
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import { MdInsertDriveFile } from 'react-icons/md';

const S3_BUCKET = 'xavier-portfolio';
const REGION = 'us-east-2';

AWS.config.update({
    accessKeyId: getAccesKey(),
    secretAccessKey: getSecretKey(),
})

const UploadButton = () => {
    const [files, setFiles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [description, setDescription] = useState("")

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    })

    const handleFileInput = (e) => {
        setFiles(e.target.files);
    }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Key: file.name,
            ContentType: file.type,
            Body: file,
        }
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) {
                    console.log(err)
                }
            })
    }

    const validFile = () => {
        if (files === []) {
            return true
        } else {
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                let tokens = file.type.split("/")
                let fileType = tokens[0]

                if (fileType !== "image" && fileType !== "video") {
                    return false
                }
            }

            return true
        }
    }

    const descriptionChanged = (e) => {
        setDescription(e.target.value)
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const upload = () => {

    }

    return (
        <Fragment>
            <Button onClick={openModal} color="primary" className="fit-content ms-3">
                <MdInsertDriveFile className="me-1 mb-1" />
                Upload Media
            </Button>

            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={toggleModal}>
                    Upload Media
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            type="file"
                            onChange={handleFileInput}
                            className="m-2"
                            invalid={!validFile()}
                            multiple
                        />
                        <FormFeedback>Invalid file type</FormFeedback>
                    </FormGroup>
                    <Input type="text" placeholder="Description" className="m-2" onChange={descriptionChanged} />
                </ModalBody>
                <ModalFooter>
                    <div className="upload-footer-row">
                        <Button onClick={upload} color="primary" disabled={!uploading}>Upload</Button>
                        <p className='my-auto' hidden={!uploading}>Uploading {progress}% done</p>
                    </div>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default UploadButton;