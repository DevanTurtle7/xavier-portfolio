/**
 * Controls that are used for a carousel
 * 
 * Props:
 *  numContent: The number of items in the carousel
 *  onChange: A callback function that is ran after the carousel controls have been
 *            used
 * 
 * @author Devan Kavalchek
 */

import { useState } from 'react';
import { Row } from 'reactstrap'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

import IconButton from './IconButton';

function CarouselControls(props) {
    const [num, setNum] = useState(0)

    /**
     * Sets num to the next index, as long as there is a next index
     */
    const next = () => {
        const numContent = props.numContent

        if (num < numContent - 1) {
            setNum(num + 1)
            props.onChange(num)
        }
    }

    /**
     * Sets num to the previous index, unless num is 0 (the first index)
     */
    const prev = () => {
        if (num > 0) {
            setNum(num - 1)
            props.onChange(num)
        }
    }

    return (
        <Row className="mx-auto justify-content-center">
            <IconButton classNames="carousel-btn" fontSize={24} onClick={prev}>
                <MdNavigateBefore />
            </IconButton>
            <p className="carousel-count mb-0 mt-2 fit-width">
                {num + 1}/{props.numContent}
            </p>
            <IconButton classNames="carousel-btn" fontSize={24} onClick={next}>
                <MdNavigateNext />
            </IconButton>
        </Row>
    )
}

export default CarouselControls;