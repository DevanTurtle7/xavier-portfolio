const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"
const PAGE_TAG = "credit"

function Credit(props) {
    const [colorsUpdated, setColorsUpdated] = useState(false)

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }
    }, [colorsUpdated])

    return (
        <div className="contact-root">
            <MetaTags>
                <meta name="theme-color" content="#ffffff" />
            </MetaTags>

            <Navbar tag={PAGE_TAG} />
            <div className="contact-container">
                <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                    xaviersylviajackson@gmail.com
                </a>
                <div className="instagram-row">
                    <a href="https://www.instagram.com/sjpencils/" target="_blank" rel="noreferrer">
                        <IconButton className="instagram-button">
                            <AiOutlineInstagram />
                        </IconButton>
                    </a>
                </div>
            </div>
            <Footer tag={PAGE_TAG} />
        </div>
    )
}

export default Credit;