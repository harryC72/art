import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [brandClicked, setBrandClicked] = useState(false);

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to='/' onClick={() => setBrandClicked(true)}>
          Harry's Art Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Nav.Link
              as={Link}
              to='/'
              active={brandClicked}
              onClick={() => setBrandClicked(true)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/art'
              onClick={() => setBrandClicked(false)}
            >
              Art work
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
