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

import { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

import Blackout from './Blackout';
import MenuButton from './MenuButton';
import BlackoutTitle from './BlackoutTitle';

const ARTIST_NAME = "xavier sylvia-jackson"

function Navbar(props) {
    return (
        <Fragment>
            <BlackoutTitle text={ARTIST_NAME} />

            <div classname="navbar">
                <Blackout text={ARTIST_NAME} />
            </div>
        </Fragment>
    )
}

export default Navbar;