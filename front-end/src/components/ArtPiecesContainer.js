import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtPieces } from '../actions/artActions';
import { ArtPieces } from './ArtPieces';

export const ArtPiecesContainer = () => {
  const dispatch = useDispatch();

  const artPiecesList = useSelector((state) => state.artPiecesList);

  const { artPieces, loading, error } = artPiecesList;

  useEffect(() => {
    dispatch(getArtPieces());
  }, [dispatch]);

  return (
    <>
      <ArtPieces loading={loading} error={error} artItems={artPieces} />
    </>
  );
};
