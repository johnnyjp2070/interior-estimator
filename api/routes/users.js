const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/User');

const saltRounds = 11;

router.get('/', (req, res) => {
  res.send('User Route - Root Page');
});

// Register route

router.post('/', async (req, res) => {
  //   res.send('Post Route - user');

  try {
    const { name, email, password, phone } = req.body;

    let userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
    });

    const hash = await bcrypt.hash(password, saltRounds);

    user.password = hash;

    user.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ msg: 'Validation failed, Please check the fields' });
      }
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
