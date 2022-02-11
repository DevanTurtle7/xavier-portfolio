import { Component } from 'react';
import { Row } from 'reactstrap'
import IconButton from './IconButton';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

class CarouselControls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: 0,
            numContent: this.props.numContent
        }
    }

    next = () => {
        let num = this.state.num
        let numContent = this.state.numContent

        if (num < numContent - 1) {
            num++
        }

        this.props.onChange(num)
        this.setState({ num: num })
    }

    prev = () => {
        let num = this.state.num

        if (num > 0) {
            num--
        }

        this.props.onChange(num)
        this.setState({ num: num })
    }

    render() {
        let num = this.state.num
        let numContent = this.state.numContent
        let counterClassNames = "carousel-count mb-0 mt-2 fit-width"

        return (
            <Row className="mx-auto justify-content-center">
                <IconButton classNames="carousel-btn" fontSize={24} onClick={this.prev}>
                    <MdNavigateBefore />
                </IconButton>
                <p className={counterClassNames}>
                    {num + 1}/{numContent}
                </p>
                <IconButton classNames="carousel-btn" fontSize={24} onClick={this.next}>
                    <MdNavigateNext />
                </IconButton>
            </Row>
        )
    }
}

export default CarouselControls;