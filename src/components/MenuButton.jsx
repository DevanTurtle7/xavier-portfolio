/**
 * A button that opens the menu
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { useState } from 'react';
import { MdMenu } from "react-icons/md"

import IconButton from './IconButton';
import Menu from './Menu';

function MenuButton(props) {
    const [open, setOpen] = useState(false)

    /**
     * Called when the button is clicked. Opens the menu.
     */
    const onClick = () => {
        setOpen(true)
    }

    /**
     * Called when the menu is closed. Updates the state to reflect this
     */
    const onClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <IconButton onClick={onClick} className="menu-btn">
                <MdMenu />
            </IconButton>
            <Menu open={open} onClose={onClose} />
        </div>
    )
}

export default MenuButton;