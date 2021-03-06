import { Component } from 'react';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';
import UploadButton from './UploadButton';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { MdRefresh } from "react-icons/md"
import MediaDisplay from './MediaDisplay';
import CollectionDropdown from './CollectionDropdown';
import TextDisplay from './TextDisplay';
import UploadTextButton from './UploadTextButton';
import UploadFolderButton from './UploadFolderButton';
import AWS from 'aws-sdk'
import FolderDisplay from './FolderDisplay';

const S3_BUCKET = 'xavier-portfolio';
const REGION = 'us-east-2';
const IMG_URL = "https://xavier-portfolio.s3.us-east-2.amazonaws.com/";

class ArtList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            mediaCount: 0,
        }

        this.db = this.props.db
    }

    getData = async () => {
        console.log("Retrieving data...")
        this.setState({ files: [] })
        const querySnapshot = await getDocs(collection(this.db, this.props.collection));

        querySnapshot.forEach(async (doc) => {
            let data = doc.data();
            let current;
            let order = data.order;
            let type = data.type

            if (type === "media") {
                let description = data.description;
                let currentContent = []
                let content = data.content;

                for (let i = 0; i < content.length; i++) {
                    let fileInfo = content[i]
                    let fileName = fileInfo.filename
                    let fileType = fileInfo.type
                    let url = IMG_URL + fileName

                    currentContent.push({ url: url, type: fileType, filename: fileName })
                }

                current = {
                    description: description,
                    order: order,
                    content: currentContent,
                    docId: doc.id,
                    type: "media",
                    link: data.link
                }
            } else if (type === "text") {
                let content = data.content
                let size = data.size

                content = content.replaceAll("$[n]", "\n")

                current = {
                    content: content,
                    order: order,
                    docId: doc.id,
                    type: "text",
                    size: size,
                    link: data.link
                }
            } else if (type === "folder") {
                let content = data.content
                let description = data.description
                let currentContent = []

                for (let i = 0; i < content.length; i++) {
                    const info = content[i]
                    const currentType = info.type

                    if (currentType === "image" || currentType === "video") {
                        const fileName = info.filename
                        const url = IMG_URL + fileName

                        // Save the content to the array
                        currentContent.push({ url: url, type: currentType })
                    } else if (currentType === "text") {
                        currentContent.push({ content: info.content, type: currentType, size: info.size })
                    }
                }

                current = {
                    content: currentContent,
                    order: order,
                    type: "folder",
                    description: description,
                    docId: doc.id
                }
            } else {
                console.log("Invalid type: " + type)
                console.log(doc.id)
            }

            if (current !== undefined) {
                let files = this.state.files;
                let mediaCount = files.length;

                if (mediaCount > 0) {
                    // Insert sorted
                    let i = 0;
                    let indexFound = false;

                    while (i < mediaCount && !indexFound) {
                        let currentOrder = files[i].order

                        if (currentOrder >= order) {
                            indexFound = true
                        } else {
                            i += 1
                        }
                    }

                    files.splice(i, 0, current)
                } else {
                    files.push(current)
                }

                this.setState({ files: files })
            }
        })
        console.log("Data retrieved")
    }

    updateMediaCount = async () => {
        let countRef = doc(this.db, "counts", this.props.collection)
        let countSnap = await getDoc(countRef)
        let size = countSnap.data().count
        this.setState({ mediaCount: size })
    }

    componentDidMount() {
        this.getData();
        this.updateMediaCount()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.updateMediaCount()

            if (this.props.collection !== prevProps.collection) {
                this.getData()
            }
        }
    }

    onUpdate = () => {
        this.getData()
        this.updateMediaCount()
    }

    collectionChanged = (collection) => {
        this.props.collectionChanged(collection)
    }

    getAWSBucket = () => {
        AWS.config.update({
            accessKeyId: this.props.awsAccessKey,
            secretAccessKey: this.props.awsSecretKey
        })

        const myBucket = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        })

        return myBucket
    }

    render() {
        let files = this.state.files;
        let displays = []

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let type = current.type

            if (type === "media") {
                displays.push(<MediaDisplay
                    data={current}
                    mediaCount={this.state.mediaCount}
                    onUpdate={this.onUpdate}
                    db={this.db}
                    collection={this.props.collection}
                    bucket={this.getAWSBucket()}
                    key={current.docId + i.toString()}
                />)
            } else if (type === "text") {
                displays.push(<TextDisplay
                    data={current}
                    mediaCount={this.state.mediaCount}
                    onUpdate={this.onUpdate}
                    db={this.db}
                    collection={this.props.collection}
                    key={current.docId + i.toString()}
                />)
            } else if (type === "folder") {
                displays.push(<FolderDisplay
                    docId={current.docId}
                    db={this.db}
                    bucket={this.getAWSBucket()}
                    collection={this.props.collection}
                    folderName={current.description}
                    onUpdate={this.onUpdate}
                    key={current.docId + i.toString()}
                />)
            }
        }

        const getFolderButton = () => {
            if (this.props.collection === "other") {
                return (<UploadFolderButton db={this.db} collection={this.props.collection} bucket={this.getAWSBucket()} onUpload={this.onUpdate} />)
            }
        }

        return (
            <Col>
                <Col className="py-3 px-2">
                    <Row>
                        <UploadButton db={this.db} onUpload={this.onUpdate} collection={this.props.collection} bucket={this.getAWSBucket()} />
                        <UploadTextButton db={this.db} onUpload={this.onUpdate} collection={this.props.collection} />
                        {getFolderButton()}
                        <CollectionDropdown
                            callback={this.collectionChanged}
                            collections={this.props.collections}
                            collection={this.props.collection}
                        />
                        <Button color="primary" className="fit-content" onClick={this.onUpdate}>
                            <MdRefresh />
                        </Button>
                    </Row>
                </Col>
                <Row className="mx-auto">
                    {displays}
                </Row>
            </Col>
        )
    }
}

export default ArtList;