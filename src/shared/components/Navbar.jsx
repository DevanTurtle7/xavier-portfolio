/**
 * A header bar that contains navigation including the artists name and the
 * navigation menu. Also contains the component that animates the page's
 * <title> attribute.
 * 
 * Props:
 *  tag: A string that identifies which page this display is on
 * 
 * @author Devan Kavalchek
 */

import { Fragment } from 'react';

import MetaTags from 'react-meta-tags';

import Blackout from './Blackout';
import BlackoutTitle from './BlackoutTitle';
import NavLink from './NavLink';

const ARTIST_NAME = "xavier sylvia-jackson"

function Navbar(props) {
    return (
        <Fragment>
            <BlackoutTitle text={ARTIST_NAME} />

            <MetaTags>
                <meta name="theme-color" content={props.bgColor} />
            </MetaTags>

            <div className="navbar-hdr">
                <Blackout text={ARTIST_NAME} />

                <div className="nav-items">
                    <NavLink label="art" link="/art" active={props.tag === "art"} />
                    <NavLink label="archive" link="/archive" active={props.tag === "archive"} />
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar;