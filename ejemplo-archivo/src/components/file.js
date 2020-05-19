import React from "react";
import { Input, Label, Button } from "reactstrap";
import { API } from "../services/env";
import axios from "axios";
import Select from 'react-select';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileChosen: null,
            files: [],
            url: `http://localhost:4000/`
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    getFiles = async () => {
        const res = await axios.get(`http://localhost:4000/file`);
        const fileData = res.data;
        this.setState({ files: [] });
        fileData.map(file => this.state.files.push({ label: file.name, value: file.file_path }))
    };

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    handleChangeFile = fileChosen => {
        this.setState({ fileChosen });
        this.setState({ url: `http://localhost:4000/${fileChosen.value}` });
    };

    componentDidMount() {
        this.getFiles();
    }

    // handleClick = () => {
    //     if (this.state.persona != null) {
    //         alert("La persona seleccionada es: " + this.state.persona.label);
    //     }
    // }

    async handleSubmit() {
        console.log(this.state.file);
        const data = new FormData()
        data.append('tabla', 'article');
        const json = JSON.stringify([{ nombre: "Hola" }, { nombre: "Hola2" }]);
        data.append('autores', json);
        data.append('file', this.state.file);
        // await axios.delete(`${API}/student`, {
        //     data: { id_language: 1 },
        // })
        await axios.post(`${API}/file`,
            data
            , { // receive two parameter endpoint url ,form data 
            });
        this.getFiles();
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
                <br></br>
                <br></br>
                <Select
                    value={this.state.fileChosen}
                    onChange={this.handleChangeFile}
                    options={this.state.files}
                    placeholder={'Seleccione un archivo'}
                />
                <br></br>
                <a href={this.state.url} download rel="noopener noreferrer" target="_blank">Click to download</a>
            </div>
        )
    };

}

export default File;