import { Component } from 'react';
import { Col } from 'reactstrap';

class CarouselItem extends Component {
    render() {
        let type = this.props.type;
        let url = this.props.url;
        let media = (<div>Invalid type</div>)

        console.log(type)

        if (type === "image") {
            console.log('setting to img')
            media = (<img src={url} alt="art" />)
        } else if (type === "video") {
            console.log('setting to vid')
            media = (<video controls>
                <source src={url} />
            </video>)
        }

        return (
            <div className="admin-carousel-item">
                {media}
            </div>
        )
    }
}

export default CarouselItem;