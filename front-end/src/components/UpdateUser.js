import React, { useState } from 'react';
import { UserForm } from './UserForm';
import { updateUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export const UpdateUser = ({ user, match }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error, loading, message } = userUpdate;

  const submitHandler = (id) => {
    dispatch(updateUser(id));
  };

  return (
    <UserForm
      error={error}
      loading={loading}
      message={message}
      submitHandler={() => submitHandler(user.id)}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      role={role}
      setRole={setRole}
    />
  );
};
