import React from 'react'
import { Container,Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router';

function Nave() {
    const navigate=useNavigate();

    const userName = sessionStorage.getItem("inputValue") || sessionStorage.getItem("email");
    const name = userName ? userName.match(/^([^@]*)@/)?.[1] : "Guest";

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand style={{color:"green",fontSize:"30px",fontWeight:"bold"}} href="#home">Client Pulse</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{name}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>

        </div>
    )
}

export default Nave