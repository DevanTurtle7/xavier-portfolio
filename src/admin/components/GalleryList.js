import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import UploadButton from './UploadButton';
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import MediaDisplay from './MediaDisplay';

class GalleryList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: []
        }

        this.db = this.props.db
        this.storage = this.props.storage
    }

    getArt = async () => {
        this.setState({ files: [] })
        const querySnapshot = await getDocs(collection(this.db, "art"));

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let filename = data.filename;
            let title = data.title
            let year = data.year;
            let medium = data.medium;
            let order = data.order;
            let type = data.type;

            getDownloadURL(ref(this.storage, filename))
                .then((url) => {
                    let files = this.state.files;

                    let current = {
                        url: url,
                        title: title,
                        year: year,
                        medium: medium,
                        order: order,
                        type: type,
                        filename: filename,
                        docId: doc.id
                    }

                    let numFiles = files.length;

                    if (numFiles > 0) {
                        // Insert sorted
                        let i = 0;
                        let indexFound = false;

                        while (i < numFiles && !indexFound) {
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
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    componentDidMount() {
        this.getArt();
    }

    onUpload = () => {
        this.getArt()
    }

    render() {
        let files = this.state.files;
        let media = []

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let type = current.type

            media.push(<MediaDisplay
                data={current}
                type={type}
                filename={current.filename}
                docId={current.docId}
                onUpdate={this.getArt}
                db={this.db}
                storage={this.storage}
                key={i}
            />)
        }

        return (
            <Col>
                <Col className="py-3 px-2">
                    <UploadButton db={this.db} storage={this.storage} onUpload={this.onUpload} />
                </Col>
                <Row className="mx-auto">
                    {media}
                </Row>
            </Col>
        )
    }
}

export default GalleryList;