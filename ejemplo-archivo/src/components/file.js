import React from "react";
import { Input, Label, Button } from "reactstrap";
import { API } from "../services/env";
import axios from "axios";

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            listaTodosProyectos : [],
            quantity : "",
            selected : ""
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
        const json = JSON.stringify([{nombre:"Hola"},{nombre:"Hola2"}]);
        data.append('autores', json);
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

    getquantity = (event) => {
        this.setState({ quantity: event.target.value });
    }

    async getprojectId  () {
        const res = await axios.get(`${API}/project/projectid/${this.state.quantity}`);
        const dataProjects = res.data;
        this.setState({selected: "id: " +  dataProjects.project.id_document + " -  name:  " +  dataProjects.project.name});
        console.log(this.state.selected)
    }


    async getprojectAll (){
        const res = await axios.get(`${API}/project/projectAll`);
        const dataProjects = res.data;

        let lista = [];
        for (let i = 0 ; i < dataProjects.length ; i ++){
            lista.push(" id: "+ dataProjects[i].id_document+ '  -  ' + "nombre: " + dataProjects[i].name  );
        }
        this.setState({listaTodosProyectos: lista});
        console.log(this.state.listaTodosProyectos)
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
                          
                <Button color="primary" type="button" onClick={() => this.getprojectAll()}>Ver todos </Button>
                <br></br>
                <br></br>
                
                <h1>{this.state.listaTodosProyectos}</h1>

                <br></br>
                <br></br>
                <h1>Escriba un id</h1>
                <Input
                    type="number"
                    onChange={this.getquantity}
                />

                <Button color="primary" type="button" onClick={() => this.getprojectId()}> Buscar </Button>
                <br></br>
                <br></br>
                <h1>{this.state.selected }</h1>



            </div>


        )
    };

}

export default File;