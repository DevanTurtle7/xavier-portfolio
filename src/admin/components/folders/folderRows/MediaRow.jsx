import { FormFeedback, FormGroup, Input } from "reactstrap";

function MediaRow(props) {

    const handleFileInput = (e) => {
        let file = e.target.files[0]
        let tokens = file.type.split("/")
        let fileType = tokens[0]

        props.fileChanged(props.index, file, fileType)
    }

    const getFeedbackMessage = () => {
        let current = props.current
        let file = current.file
        let type = current.type

        if (file === null) {
            return "File must be uploaded"
        } else if (type !== "image" && type !== "video") {
            return "Invalid file type"
        }
    }

    const valid = () => {
        const current = props.current
        const file = current.file
        const type = current.type

        return file !== null && (type === "image" || type === "video")
    }

    const getDisplay = () => {
        const current = props.current
        const type = current.type
        const file = URL.createObjectURL(props.current.file)
        let preview;

        if (type === "image") {
            preview = (
                <img src={file} alt="preview"/>
            )
        } else if (type === "video") {
            preview = (
                <video controls controlsList="nodownload" preload="metadata">
                {/* Start timestamp at 0.001 seconds to render thumbnail */}
                <source src={file + "#t=0.001"} />
            </video>
            )
        }

        return (
            <div className="folder-item-preview">
                {preview}
            </div>
        )
    }

    return (
        <div className="folder-media-row">
            {props.current.file === null || !valid() ? (
                <FormGroup>
                    <Input
                        type="file"
                        className="m-2"
                        multiple={false}
                        onChange={handleFileInput}
                        invalid={!valid()}
                    />
                    <FormFeedback>{getFeedbackMessage()}</FormFeedback>
                </FormGroup>
            ) : (
                <>
                    {getDisplay()}
                </>
            )}
        </div>
    )
}

export default MediaRow