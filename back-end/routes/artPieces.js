import { Router } from 'express';
import artPiece from '../models/ArtPiece';
import { upload } from '../utils/fileUpload';

// import auth from "../middleware/auth.js";

const router = Router();

router.get('/', (req, res) => {
  artPiece
    .find()
    .then((data) => {
      console.log('DATA', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting art pieces',
      });
    });
});

router.get('/:id', (req, res) => {
  artPiece
    .find({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the blog art piece',
      });
    });
});

router.post('/', upload.single('file'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  const post = new artPiece({
    title: req.body.title,
    alt: req.body.alt,
    file: '/uploads/images/' + req.file.filename,
    technique: req.body.technique,
  });

  post
    .save()
    .then((data) => {
      console.log('data', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the art piece.',
      });
    });
});

router.put('/:id', (req, res) => {
  artPiece
    .updateOne(
      { _id: req.params.id }, // Filter
      {
        $set: {
          title: req.body.title,
          alt: req.body.alt,
          file: '/uploads/images/' + req.file.filename,
          technique: req.body.technique,
        },
      }, // Update
      { upsert: true } // add document with req.body._id if not exists
    )

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while updating the art piece.',
      });
    });
});

router.delete('/:id', (req, res) => {
  artPiece
    .findByIdAndDelete({
      _id: req.params.id,
      function(err, post) {
        if (err) return next(err);
        res.json(post);
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while trying to delete the art piece',
      });
    });
});

export default router;
