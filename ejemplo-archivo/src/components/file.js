import React from "react";
import { Input, Label, Button } from "reactstrap";
// import { API } from "../services/env";
// import axios from "axios";

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    async handleSubmit() {
        console.log(this.state.file);
        // await axios.delete(`${API}/student`, {
        //     data: { id_language: 1 },
        // })
    }

    render() {
        return (
            <div>
                <br></br>
                <Label>Seleccione un archivo:</Label>
                <Input
                    type="file"
                    onChange={this.handleChange}
                />
                <br></br>
                <Button color="primary" type="button" onClick={() => this.handleSubmit()}>Upload</Button>
            </div>
        )
    };

}

export default File;