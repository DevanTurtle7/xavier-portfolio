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

        let putObjectPromise = myBucket.putObject(params).on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        }).promise()

        putObjectPromise.then((data) => {
            console.log('success!')
        }).catch((err) => {
            console.log(err)
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
        setFiles([])
        setUploading(false)
        setProgress(0)
        setDescription("")
        setModalOpen(true)
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const upload = () => {
        if (!uploading) {
            setUploading(true)

            let fileData = []
            let numFiles = files.length;

            for (let i = 0; i < numFiles; i++) {
                let file = files[i]
                let tokens = file.name.split(".")
                let numTokens = tokens.length
                let suffix = tokens[numTokens - 1]
                let time = new Date().getTime()
                let name = ""

                for (let i = 0; i < numTokens - 1; i++) {
                    name += tokens[i]
                }

                name += "_" + time + "." + suffix

                let typeTokens = file.type.split("/")
                let fileType = typeTokens[0]

                fileData.push({name: name, type: fileType})

                const params = {
                    ACL: 'public-read',
                    Key: name,
                    ContentType: file.type,
                    Body: file,
                }

                let putObjectPromise = myBucket.putObject(params).on('httpUploadProgress', (evt) => {
                    //setProgress(Math.round((evt.loaded / evt.total) * 100))
                }).promise()

                putObjectPromise.then((data) => {
                    console.log('success!')
                    setUploading(false)
                    closeModal()
                }).catch((err) => {
                    console.log(err)
                    alert("There was an error while uploading")
                    setUploading(false)
                })
            }

            console.log(fileData)
        }
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
                        <Button onClick={upload} color="primary" disabled={uploading}>Upload</Button>
                        <p className='my-auto' hidden={!uploading}>Uploading {progress}% done</p>
                    </div>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default UploadButton;