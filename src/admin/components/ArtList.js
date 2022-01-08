import { Component } from 'react';
import {
    Button,
    Col,
    Row
} from 'reactstrap';
import UploadButton from './UploadButton';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import MediaDisplay from './MediaDisplay';
import { MdRefresh } from "react-icons/md"
import CarouselDisplay from './CarouselDisplay';

class ArtList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            mediaCount: 0
        }

        this.db = this.props.db
        this.storage = this.props.storage
    }

    getArt = async () => {
        console.log("Retrieving art...")
        this.setState({ files: [] })
        const querySnapshot = await getDocs(collection(this.db, "art"));

        querySnapshot.forEach(async (doc) => {
            let data = doc.data();
            let title = data.title
            let year = data.year;
            let description = data.description;
            let type = data.type;
            let order = data.order;
            let current;

            if (type === "carousel") {
                let currentContent = []
                let content = data.content;

                for (let i = 0; i < content.length; i++) {
                    let fileInfo = content[i]
                    let filename = fileInfo.filename
                    let fileType = fileInfo.type

                    await getDownloadURL(ref(this.storage, filename)).then((url) => {
                        currentContent.push({ url: url, type: fileType, filename: filename })
                    })
                }

                current = {
                    title: title,
                    year: year,
                    description: description,
                    order: order,
                    type: type,
                    content: currentContent,
                    docId: doc.id,
                }
            } else {
                let filename = data.filename;

                await getDownloadURL(ref(this.storage, filename))
                    .then((url) => {
                        current = {
                            url: url,
                            title: title,
                            year: year,
                            description: description,
                            order: order,
                            type: type,
                            docId: doc.id,
                            filename: filename,
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
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
        console.log("Art retrieved")
    }

    updateMediaCount = async () => {
        let countRef = doc(this.db, "counts", "art")
        let countSnap = await getDoc(countRef)
        let size = countSnap.data().count
        this.setState({ mediaCount: size })
    }

    componentDidMount() {
        this.getArt();
        this.updateMediaCount()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.updateMediaCount()
        }
    }

    onUpdate = () => {
        this.getArt()
        this.updateMediaCount()
    }

    render() {
        let files = this.state.files;
        let media = []

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let type = current.type

            if (type === "carousel") {
                media.push(<CarouselDisplay
                    data={current}
                    type="carousel"
                    mediaCount={this.state.mediaCount}
                    onUpdate={this.onUpdate}
                    db={this.db}
                    storage={this.storage}
                    key={i}
                />)
            } else {
                media.push(<MediaDisplay
                    data={current}
                    type={type}
                    mediaCount={this.state.mediaCount}
                    onUpdate={this.onUpdate}
                    db={this.db}
                    storage={this.storage}
                    key={i}
                />)
            }
        }

        return (
            <Col>
                <Col className="py-3 px-2">
                    <Row>
                        <UploadButton db={this.db} storage={this.storage} onUpload={this.onUpdate} />
                        <Button color="primary" className="fit-content" onClick={this.onUpdate}>
                            <MdRefresh />
                        </Button>
                    </Row>
                </Col>
                <Row className="mx-auto">
                    {media}
                </Row>
            </Col>
        )
    }
}

export default ArtList;