import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { getUsers } from '../actions/userActions';
import { Loader } from './Loader';
import { Message } from './Message';

export const UserTable = ({ history }) => {
  const dispatch = useDispatch();

  const listUsers = useSelector((state) => state.listUsers);
  const { users, error, loading } = listUsers;
  console.log('listUsers', listUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRedirect = (id, user) => {
    history.push({
      pathname: `/user/${id}`,
      state: user,
    });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button onClick={() => handleRedirect(user._id, user)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
