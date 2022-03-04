/**
 * An icon button
 * 
 * Props:
 *  classNames: Class names that are added to the icon button
 *  fontSize: The font size of the icon
 *  onClick: A function that runs after this button has been clicked
 *  children: Should be an icon, that is wrapped in this
 * 
 * @author Devan Kavalchek
 */

function IconButton(props) {
    /**
     * Run after this button is clicked. Calls the callback passed in through
     * the props
     */
    const onClick = () => {
        props.onClick()
    }

    /**
     * 
     * Get the class names of this element
     * 
     * @returns A string of class names
     */
    const getClassNames = () => {
        const classProp = props.className
        let classNames = classProp === undefined ? "" : classProp
        classNames += " icon-btn"

        return classNames
    }

    /**
     * Gets the font size of the icon. It is 20px by default
     * 
     * @returns A string of the font size in css format (px)
     */
    const getFontSize = () => {
        const fontSizeProp = props.fontSize

        // Set font size to 20px by default
        let fontSize = fontSizeProp === undefined ? '20px' : fontSizeProp.toString() + "px"

        return fontSize
    }

    return (
        <button onClick={onClick} className={getClassNames()} style={{ 'fontSize': getFontSize() }}>
            {props.children}
        </button>
    )
}

export default IconButton;