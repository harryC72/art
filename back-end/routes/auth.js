import { Router } from 'express';
import User from '../models/user';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';

const router = Router();

const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log('USER', req.body);
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash: md5(password),
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, secret, { expiresIn: 3600 });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    let hashedPassword = md5(password);

    let passwordCorrect = hashedPassword === user.passwordHash;

    console.log('PASSWORD CORRECT', passwordCorrect);

    if (!passwordCorrect) throw Error('Password incorrect!');

    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
      expiresIn: 3600,
    });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/user/:id', (req, res) => {
  console.log('ID', req.params.id);
  User.findById(req.params.id)
    .select('-passwordHash')
    .then((user) => res.json(user));
});

router.route('/user').get((req, res) => {
  User.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

router.route('/update-user/:id').put((req, res, next) => {
  console.log('ID FROM BACKEND', req.params, req.body);

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log('User successfully updated!');
      }
    }
  );
});

router.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

export default router;
