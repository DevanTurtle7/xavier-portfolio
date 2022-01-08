import { Component } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

class CarouselItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    onClick = (e) => {
        this.props.callback(this.props.index, e.target.value)
    }

    render() {
        let type = this.props.type;
        let url = this.props.url;
        let index = this.props.index;
        let numItems = this.props.numItems;
        let media = (<div>Invalid type</div>)

        if (type === "image") {
            media = (<img src={url} alt="art" />)
        } else if (type === "video") {
            media = (<video controls>
                <source src={url} />
            </video>)
        }

        let dropdownItems = []

        for (let i = 0; i < numItems; i++) {
            dropdownItems.push(<DropdownItem
                active={i === index}
                onClick={this.onClick}
                value={i}
                key={i}
            >{i + 1}</DropdownItem>)
        }

        return (
            <div className="admin-carousel-item">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="pb-1">
                    <DropdownToggle caret color="primary">
                        {index + 1}
                    </DropdownToggle>
                    <DropdownMenu className="carousel-dropdown">
                        {dropdownItems}
                    </DropdownMenu>
                </Dropdown>
                {media}
            </div>
        )
    }
}

export default CarouselItem;