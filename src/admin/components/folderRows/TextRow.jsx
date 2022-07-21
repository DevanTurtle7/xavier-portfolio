import { FormGroup, Input, Label } from "reactstrap"

function TextRow(props) {

    const sizeChanged = (e) => {
        props.sizeChanged(props.index, parseInt(e.target.value))
    }

    const textChanged = (e) => {
        props.textChanged(props.index, e.target.value)
    }

    return (
        <div className="folder-text-row">
            <FormGroup>
                <Label>Font size (px)</Label>
                <Input type="number" value={props.current.size} min={1} onChange={sizeChanged} />
            </FormGroup>
            <FormGroup>
                <Label>Text</Label>
                <Input type="textarea" placeholder="Enter text" onChange={textChanged} />
            </FormGroup>
        </div>
    )
}

export default TextRow