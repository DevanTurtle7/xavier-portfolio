import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import ImageDisplay from '../components/ImageDisplay';
import Navbar from '../components/Navbar'

class Art extends Component {
    constructor (props) {
        super(props)

        this.images = [
            {
                image: "image1.png",
                label: "Image Title",
                year: 2021,
                description: "Description"
            },
            {
                image: "image2.png",
                label: "Painting",
                year: 2020,
                description: "Description"
            },
            {
                image: "image3.png",
                label: "Another One",
                year: 2019,
                description: "Description"
            },
            {
                image: "image4.png",
                label: "Final",
                year: 2020,
                description: "Sculpture"
            }
        ]
    }

    render() {
        let imageDisplays = []

        for (var i = 0; i < this.images.length; i++) {
            let current = this.images[i]

            imageDisplays.push(<ImageDisplay
                id={i}
                image={current.image}
                label={current.label}
                year={current.year}
                description={current.description}
            />)
        }

        return (
            <Fragment>
               <Navbar/>

                <Col className="Art">
                    {imageDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;