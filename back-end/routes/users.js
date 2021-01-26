import { Router } from 'express';
import User from '../models/user';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const router = Router();

const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

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

    const hashedPassword = md5(password);
    let token;

    if (user.passwordHash === hashedPassword) {
      token = jwt.sign({ id: user._id }, secret, { expiresIn: 3600 });
    } else {
      throw Error('Wrong Password');
    }

    res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const updateObject = req.body; // {last_name : "smith", age: 44}
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: updateObject }
    );
    console.log('updated', updatedUser);
    res.status(200).send({ msg: `${req.params.id}-User has been updated` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
