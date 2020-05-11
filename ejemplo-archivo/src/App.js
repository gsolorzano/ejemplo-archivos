import React from 'react';
import './App.css';
import {
  Container,
  Row,
  Col
} from "reactstrap";
import File from './components/file.js'

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col xs="6">
            <File />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
