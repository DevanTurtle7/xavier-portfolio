function SideLine(props) {

    const getClassNames = () => {
        const stick = props.stick
        const desktopOnly = props.desktopOnly
        let classNames = "side-line"

        if (desktopOnly === true) { classNames += " desktop-only" }
        if (stick) { classNames += " stick" }

        return classNames
    }

    return (
        <div className={getClassNames()} style={{ left: props.left }} />
    )
}

export default SideLine;