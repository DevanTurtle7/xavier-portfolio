import { useState } from "react"
import { MdDelete } from "react-icons/md";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

function FolderRowWrapper(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen(!dropdownOpen)

    const onMove = (index) => props.onMove(props.index, index)
    const onRemove = () => props.onRemove()

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
        <div className="folder-item-control-col">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="pb-1">
                <DropdownToggle caret color="primary">
                    {props.index + 1}
                </DropdownToggle>
                <DropdownMenu className="carousel-dropdown">
                    {getDropdownItems()}
                </DropdownMenu>
            </Dropdown>
            <Button color="danger" onClick={onRemove}>
                <MdDelete/>
            </Button>
        </div>
            {props.children}
        </div>
    )
}

export default FolderRowWrapper