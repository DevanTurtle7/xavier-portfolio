import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import ImageDisplay from '../components/ImageDisplay';
import VideoDisplay from '../components/VideoDisplay';
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

    sortByOrder = () => {
        let images = this.state.images

        images.sort((first, second) => {
            if (first.order < second.order) {
                return -1
            } else if (first.order > second.order) {
                return 1
            } else {
                return 0
            }
        })

        this.setState({ images: images })
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
            let type = data.type;
            let order = data.order;

            getDownloadURL(ref(this.storage, filename))
                .then((url) => {
                    let images = this.state.images;

                    let current = {
                        url: url,
                        title: title,
                        year: year,
                        medium: medium,
                        order: order,
                        type: type
                    }

                    let numImages = images.length;

                    if (numImages > 0) {
                        // Insert sorted
                        let i = 0;
                        let indexFound = false;

                        while (i < numImages && !indexFound) {
                            let currentOrder = images[i].order

                            if (currentOrder >= order) {
                                indexFound = true
                            } else {
                                i += 1
                            }
                        }

                        images.splice(i, 0, current)
                    } else {
                        images.push(current)
                    }

                    this.setState({ images: images })
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    componentDidMount() {
        this.getArt();
    }

    render() {
        let mediaDisplays = []
        let images = this.state.images;

        for (var i = 0; i < images.length; i++) {
            let current = images[i]
            let type = current.type

            if (type === "image") {
                mediaDisplays.push(<ImageDisplay
                    data={current}
                    key={i}
                />)
            } else if (type === "video") {
                mediaDisplays.push(<VideoDisplay
                    data={current}
                    key={i}
                />)
            }
        }

        return (
            <Fragment>
                <Navbar />
                <Col className="art">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;