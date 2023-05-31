"use client"

import Link from 'next/link';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome } from "react-icons/fa";


export default function AppNavbar() {
  const [isAuthenticated, setAUthenticated] = useState(true);

  const handleLogout = () => {
    console.log('logout!')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} href="/"><FaHome /> Funny Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          {!isAuthenticated ? (
            <Form className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Email"
                className="me-2"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                className="me-2"
              />
              <Button variant="outline-success">Login/Register</Button>
            </Form>
          ) : (
            <div className='d-flex gap-2 align-items-center'>
              <div>Welcome someone@gmail.com</div>
              <Link className='btn btn-outline-success' href={'/share'}>
                Share a movie
              </Link>
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
