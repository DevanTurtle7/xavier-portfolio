/**
 * A vertical line. Can stick to the top of the screen to appear the length
 * of the page.
 * 
 * Props:
 *  left: How far from the left of the screen this line is
 *  stick: Whether or not this line is stuck to the top of the page
 *  desktopOnly (OPTIONAL): If true, this line will not render on mobile
 * 
 * @author Devan Kavalchek
 */

function SideLine(props) {
    /**
     * Gets the class names of the sideline
     * 
     * @returns A string of class names
     */
    const getClassNames = () => {
        const stick = props.stick
        let classNames = "side-line"

        if (props.desktopOnly) { classNames += " desktop-only" }
        if (stick) { classNames += " stick" }

        return classNames
    }

    return (
        <div className={getClassNames()} style={{ left: props.left }} />
    )
}

export default SideLine;