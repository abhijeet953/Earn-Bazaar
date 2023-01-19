import React from "react";
// import Mainheader from "./header/Mainheader.jsx";
import "./main.css";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import pic from "./assets/pic.png";
import { LinkContainer } from "react-router-bootstrap";

function Main() {
  return (
    <div className="Home">
      <div className="content">
        <Container>
          <Row>
            <Col sm={6}>
              <Row> 
                <Container className="content-text">
                  Matching developers
                  <br /> with great companies.
                </Container>
                <Col sm={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title> For Companies</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <LinkContainer to='/register'>
                      <button className="btn btn-primary"> Start Exploring</button>
                      </LinkContainer>
                    </Card.Body>
                  </Card> 
                </Col>
                <Col sm={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title> For Capital Seekers</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </Card.Text>
                      <LinkContainer to='/register'>
                      <button className="btn btn-primary"> Sign Up</button>
                      </LinkContainer>
                      </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <img className="content-pic" src={pic} alt="EB1.0" />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              Copyright © 2022 EarnBazaar | Careers
              <br />
              Privacy Policy
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Main;
