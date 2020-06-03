import React from "react";
import { Input, Label, Button, Progress } from "reactstrap";
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
            url: `${API}`,
            uploadPercentage: 0,
            fileChosenMultiple: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitMultiple = this.handleSubmitMultiple.bind(this);
    }


    getFiles = async () => {
        const res = await axios.get(`${API}/file`);
        const fileData = res.data;
        this.setState({ files: [] });
        fileData.map(file => this.state.files.push({ label: file.name, value: file.file_path, id: file.id_document }))
    };

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    handleChangeMultiple(e) {
        this.setState({ fileChosenMultiple: [] });
        let arr = []
        for (let i = 0; i < e.target.files.length; i++) {
            arr.push(e.target.files[i]);
        }
        this.setState({ fileChosenMultiple: arr });
    }

    handleChangeFile = fileChosen => {
        this.setState({ fileChosen });
        this.setState({ url: `${API}/${fileChosen.value}` });
    };

    componentDidMount() {
        this.getFiles();
    }

    handleClick = async () => {
        if (this.state.fileChosen != null) {
            const bod = {
                dni: this.state.fileChosen.id,
                path: this.state.fileChosen.value
            }
            await axios.delete(`${API}/file`, { data: bod });
            this.setState({ fileChosen: null });
            this.getFiles();
        }
    }

    async handleSubmit() {

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                    this.setState({ uploadPercentage: percent })
                }
            }
        }

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
            data, options).then(res => {
                console.log(res)
                this.setState({ uploadPercentage: 100 }, () => {
                    setTimeout(() => {
                        this.setState({ uploadPercentage: 0 })
                    }, 1000);
                })
            })
        this.getFiles();
    }

    async handleSubmitMultiple() {
        console.log("Todo: " + this.state.fileChosenMultiple);
        const data = new FormData()
        data.append('tabla', 'article');
        //const json = JSON.stringify([{ nombre: "Hola" }, { nombre: "Hola2" }]);
        //data.append('autores', json);
        console.log(this.state.fileChosenMultiple.length);
        for (let i = 0; i < this.state.fileChosenMultiple.length; i++) {
            console.log(i);
            data.append('file', this.state.fileChosenMultiple[i]);
        }
        // await axios.delete(`${API}/student`, {
        //     data: { id_language: 1 },
        // })
        await axios.post(`${API}/filemultiple`,
            data
            , { // receive two parameter endpoint url ,form data 
            });
        this.getFiles();
    }

    render() {
        const { uploadPercentage } = this.state;
        return (
            <div>
                <br></br>
                <Label>Seleccione un archivo:</Label>
                <Input
                    type="file"
                    onChange={this.handleChange}
                />
                { uploadPercentage > 0 && <Progress value={uploadPercentage} active="True" label={`${uploadPercentage}%`} /> }
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
                <br></br>
                <Button color="danger" type="button" onClick={() => this.handleClick()}>Borrar</Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Label>Seleccione uno o más archivos:</Label>
                <Input
                    type="file"
                    onChange={this.handleChangeMultiple}
                    multiple="multiple"
                />
                <br></br>
                <Button color="primary" type="button" onClick={() => this.handleSubmitMultiple()}>Upload</Button>
            </div>
        )
    };

}

export default File;