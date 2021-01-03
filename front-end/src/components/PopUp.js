import React from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const PopUp = ({ handleClose, show, content }) => {
  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Body style={{ width: '100%', padding: '30px' }}>
        {content}
      </Modal.Body>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={handleClose}
        style={{ position: 'absolute', bottom: '9px', right: '9px' }}
      />
    </Modal>
  );
};
