import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const homeStyle = {
  width: '90%',
  padding: '10px',
  boxSizing: 'border-box',
  display: 'flex',
};

export const Home = () => {
  return (
    <Container>
      <Card style={homeStyle}>
        <Card.Img variant='top' src='holder.js/100px180' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant='primary'>Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
