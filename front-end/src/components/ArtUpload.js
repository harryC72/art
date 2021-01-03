import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormContainer } from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addArtPiece } from '../actions/artActions';
import { Message } from '../components/Message';
import { Loader } from './Loader';

export const ArtUpload = () => {
  const [file, setFile] = useState('');
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [technique, setTechnique] = useState('');

  const dispatch = useDispatch();
  const artPiece = useSelector((state) => state.artPiece);
  const { loading, error, success } = artPiece;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addArtPiece(title, alt, technique, file));
    setFile('');
    setAlt('');
    setTitle('');
    setTechnique('');
  };

  return (
    <FormContainer>
      <h3>Upload art piece</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Upload successful</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control
            type='text'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            value={alt}
            placeholder='Alternative text'
            onChange={(e) => setAlt(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            type='text'
            value={technique}
            placeholder='Technique'
            onChange={(e) => setTechnique(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Upload</Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};
