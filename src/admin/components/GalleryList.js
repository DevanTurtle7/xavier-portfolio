import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import UploadButton from './UploadButton';
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import ImageDisplay from './ImageDisplay';

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
                        type: type
                    }

                    files.push(current)
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

        console.log(files.length)

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let type = current.type
            let url = current.url
            let title = current.title

            if (type === "image") {
                media.push(<ImageDisplay
                    url={url}
                    title={title}
                    key={i}
                />)
            } else if (type === "video") {
                media.push(<video src={url}>

                </video>)
            }
        }


        return (
            <Col>
                <Col className="p-2">
                    <UploadButton db={this.db} storage={this.storage} onUpload={this.onUpload} />
                </Col>
                <Row>
                    {media}
                </Row>
            </Col>
        )
    }
}

export default GalleryList;