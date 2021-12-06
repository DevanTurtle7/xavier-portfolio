import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import ImageDisplay from '../components/ImageDisplay';
import Navbar from '../components/Navbar'

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

class Art extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
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

            getDownloadURL(ref(this.storage, filename))
                .then((url) => {
                    let images = this.state.images;

                    let current = {
                        url: url,
                        title: title,
                        year: year,
                        medium: medium
                    }

                    images.push(current)
                    this.setState({ images: images })
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }

    componentDidMount() {
        this.getArt();
    }

    render() {
        let imageDisplays = []
        let images = this.state.images;

        for (var i = 0; i < images.length; i++) {
            let current = images[i]

            imageDisplays.push(<ImageDisplay
                url={current.url}
                title={current.title}
                year={current.year}
                medium={current.medium}
                key={i}
            />)
        }

        return (
            <Fragment>
                <Navbar />
                <Col className="art">
                    {imageDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;