import { Button } from "reactstrap"

function AddRow(props) {

    const addMedia = () => props.onAdd("media")
    const addText = () => props.onAdd("text")

    return (
        <div className="folder-add-row">
            <p>Choose item to add</p>

            <div className="folder-add-button-row">
                <Button color="primary" onClick={addMedia}>Media</Button>
                <Button color="primary" onClick={addText}>Text</Button>
            </div>
        </div>
    )
}

export default AddRow 