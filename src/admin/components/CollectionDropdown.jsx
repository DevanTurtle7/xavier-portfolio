import { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap';

class ArtList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    onChange = (e) => {
        let index = e.target.value
        let current = this.props.collections[index]

        this.props.callback(current.value)
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        let dropdownItems = []
        let collectionName = ""

        for (let i = 0; i < this.props.collections.length; i++) {
            let current = this.props.collections[i]
            let name = current.name
            let value = current.value
            let active = this.props.collection === value
            if (active) {collectionName = name}

            dropdownItems.push(<DropdownItem
                active={active}
                onClick={this.onChange}
                value={i}
                key={i}
            >{name}</DropdownItem>)
        }

        return (
            <Dropdown isOpen={this.state.open} toggle={this.toggle} className="fit-content">
                <DropdownToggle color="primary" caret>
                {collectionName}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownItems}
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default ArtList;