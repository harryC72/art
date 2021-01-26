import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Message } from './Message';
import { Loader } from './Loader';

export const UserForm = (props) => {
  const {
    error,
    loading,
    message,
    submitHandler,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = props;
  return (
    <>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='formFirstNamt'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {password && (
          <Form.Group controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        )}
        {confirmPassword && (
          <Form.Group controlId='formConfirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        )}
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};
