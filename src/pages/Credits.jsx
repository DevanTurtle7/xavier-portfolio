import '../style/credits.css';

import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"
const PAGE_TAG = "credits"

function Credits(props) {
    const [colorsUpdated, setColorsUpdated] = useState(false)
    const names = {
        "Lisa - Jean Sylvia": "",
        "Clarence Taylor": "",
        "Donna Suza": "",
        "Cecil Hickman": "",
        "Aidan Smith": "",
        "Nate Briggs": "https://linktr.ee/harboringartist",
        "Dashiell Tidrick": "",
        "Simon Burgess ": "",
        "Kai Gyorki": "",
        "Devan Kavalchek": "https://kavalchek.dev/",
        "Anthony Mastromatteo": "http://www.mastromatteo.art/",
        "Alex Infield": "",
        "Alec Samperi": "",
        "Baran Shafiey": "",
    }

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }
    }, [colorsUpdated])

    const getCredits = () => {
        const elements = []

        for (var name in names) {
            var link = names[name];

            if (link !== "") {
                elements.push(<a href={link} className="credit-link" target="_blank" rel="noreferrer">{name}</a>)
            } else {
                elements.push(<p className="credit">{name}</p>)
            }
        }

        return elements;
    }

    return (
        <div id="credits-root">
            <Navbar tag={PAGE_TAG} />
            <div className="credits-col">
                <p className="credit"><b>special thanks to:</b></p>
                {getCredits()}
            </div>
            <Footer tag={PAGE_TAG} />
        </div>
    )
}

export default Credits;