/**
 * A header bar that contains navigation including the artists name and the
 * navigation menu. Also contains the component that animates the page's
 * <title> attribute.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { Fragment, useEffect, useState } from 'react';

import Blackout from './Blackout';
import BlackoutTitle from './BlackoutTitle';
import NavLink from './NavLink';

const ARTIST_NAME = "xavier sylvia-jackson"

const LABELS = [
    ["hypothetical", "perfection"],
    ["Live,", "Die."],
    ["un", "balanced"],
    ["feeling", "lucky"],
    ["death", "wish"],
    ["for", "free."],
    ["REAL,", "FAKE"],
    ["hugs,", "kisses"],
    ["no", "exit"],
    ["untitled,", "unmastered"],
    ["after", "hours"],
    ["dark", "fantasy"],
    ["on", "sight"],
    ["mortal", "man"],
    ["dont", "tell"],
    ["bottomless", "pit"],
    ["un", "made"],
    ["RIGHT", "NOW!"],
    ["walk", "fast"],
    ["Two", "Words"],
    ["Free", "Way"],
    ["Road", "Runner"],
    ["Thug", "Tears"],
]

const DEFAULT_LABELS = ["art", "other"]

const INIT_TIME = 2000
const STEP_TIME = 100

function Navbar(props) {
    const [hasSetUp, setHasSetUp] = useState(false)
    const [labels, setLabels] = useState(DEFAULT_LABELS)

    useEffect(() => {
        let interval;
        let timeout;

        if (!hasSetUp) {
            timeout = setTimeout(() => {
                setHasSetUp(true)
            }, INIT_TIME)
        }

        if (hasSetUp) {
            interval = setInterval(() => {
                const index = Math.floor(Math.random() * LABELS.length);
                setLabels(LABELS[index])
            }, STEP_TIME)
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [hasSetUp])

    return (
        <Fragment>
            <BlackoutTitle text={ARTIST_NAME} />

            <div className="navbar-hdr">
                <div className='blackout-container'>
                    <Blackout text={ARTIST_NAME} />
                </div>

                <div className="nav-items">
                    <div className="nav-item-container right">
                        <NavLink label={labels[0]} link="/art" />
                    </div>
                    <div className='fit-content'>
                        <p>/</p>
                    </div>
                    <div className='nav-item-container left'>
                        <NavLink label={labels[1]} link="/other" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar;