import { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

function FolderRowWrapper(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen(!dropdownOpen)

    const onMove = (index) => props.onMove(props.index, index)

    const getDropdownItems = () => {
        let dropdownItems = []

        for (let i = 0; i < props.numItems; i++) {
            dropdownItems.push(
                <DropdownItem
                    active={i === props.index}
                    onClick={() => { onMove(i) }}
                    value={i}
                    key={i}>
                    {i + 1}
                </DropdownItem>)
        }

        return dropdownItems
    }

    return (
        <div className="folder-item-row">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="pb-1">
                <DropdownToggle caret color="primary">
                    {props.index + 1}
                </DropdownToggle>
                <DropdownMenu className="carousel-dropdown">
                    {getDropdownItems()}
                </DropdownMenu>
            </Dropdown>
            {props.children}
        </div>
    )
}

export default FolderRowWrapper