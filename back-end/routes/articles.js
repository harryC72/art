import { Router } from 'express';
import Article from '../models/Article';

const router = Router();

router.post('/', (req, res) => {
  const post = new Article({
    title: req.body.title,
    ingress: req.body.ingress,
    text: req.body.text,
  });

  post
    .save()
    .then((data) => {
      console.log('article saved', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the article',
      });
    });
});

router.put('/:id', (req, res) => {
  console.log('REQ', req.body, req.params);

  Article.updateOne(
    { _id: req.params.id }, // Filter
    {
      $set: {
        title: req.body.title,
        ingress: req.body.ingress,
        text: req.body.text,
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
          err.message || 'Some error occurred while updating the blog article.',
      });
    });
});

router.delete('/:id', (req, res) => {
  Article.findByIdAndDelete({
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
          'Some error occurred while trying to delete the article',
      });
    });
});

export default router;
