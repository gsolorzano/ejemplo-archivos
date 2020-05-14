import React from "react";
import { Input, Label, Button } from "reactstrap";
import { API } from "../services/env";
import axios from "axios";

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getprojectAll = this.getprojectAll.bind(this);
    }

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    async handleSubmit() {
        console.log(this.state.file);
        const data = new FormData()
        data.append('tabla', 'article');
        //data.append('autores', [{nombre:"Hola"},{nombre:"Hola2"}]);
        data.append('file', this.state.file);
        // await axios.delete(`${API}/student`, {
        //     data: { id_language: 1 },
        // })
        await axios.post(`${API}/file`,
            data
            , { // receive two parameter endpoint url ,form data 
            })
            .then(res => { // then print response status
                console.log(res.data.path)
            });
    }


    async getprojectAll (){
        const res = await axios.get(`${API}/projectall`);
        const provinceData = res.data;
        console.log(provinceData)

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
                <br></br>
                <br></br>
                
                <Button color="primary" type="button" onClick={() => this.getprojectAll()}>Ver</Button>
            </div>
        )
    };

}

export default File;