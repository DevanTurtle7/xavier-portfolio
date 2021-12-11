import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import UploadButton from './UploadButton';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
        let artQuery = query(collection(this.db, "art"), orderBy("order"))
        const querySnapshot = await getDocs(artQuery);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let filename = data.filename;
            let title = data.title
            let year = data.year;
            let medium = data.medium;
            let order = data.order;
            let type = data.type;
            console.log(order)

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

        for (let i = 0; i < files.length; i++) {
            let current = files[i]
            let type = current.type

            media.push(<MediaDisplay
                clubData={current}
                type={type}
                key={i}
            />)
        }


        return (
            <Col>
                <Col className="p-2">
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