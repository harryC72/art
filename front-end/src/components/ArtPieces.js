import React, { useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { Loader } from './Loader';
import { Message } from './Message';
import { PopUp } from './PopUp';

export const ArtPieces = ({ artItems, loading, error }) => {
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setActiveItem(item);
  };

  return (
    <CardDeck
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {show && <PopUp show={show} handleClose={handleClose} />}
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {artItems.map((item) => {
        return (
          <Card
            style={{ width: '400px', margin: '10px' }}
            key={item._id}
            bsPrefix='customCard'
          >
            <Card.Img
              variant='top'
              src={item.file}
              alt={item.alt}
              onClick={() => handleShow(item)}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle>Technique</Card.Subtitle>
              <Card.Text>{item.technique}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      <PopUp
        key={activeItem._id}
        handleClose={handleClose}
        show={show}
        content={
          <img
            src={activeItem.file}
            alt={activeItem.alt}
            style={{ width: '100%' }}
          />
        }
      />
    </CardDeck>
  );
};
