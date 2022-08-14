import "../style/PageNotFound.css"

import { Fragment, useState, useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import BlackoutTitle from "../shared/components/BlackoutTitle"

const ARTIST_NAME = "xavier sylvia-jackson"

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"

function PageNotFound(props) {
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
        <Fragment>
            <MetaTags>
                <meta name="theme-color" content={BG_COLOR} />
            </MetaTags>
            <BlackoutTitle text={ARTIST_NAME} />

            <div className="page">
                <div className="textbox">
                    <p>Error 404</p>
                    <p>Page not found</p>
                    <a href="/art">Turn back now</a>
                </div>

                <video autoPlay muted loop id="background-video">
                    <source src="media/404video.mov" />
                </video>
            </div>
        </Fragment>
    )
}

export default PageNotFound