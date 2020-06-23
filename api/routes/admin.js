const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../model/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const adminAuth = require("../../middleware/adminAuth");

// router.get("/", (req, res) => {
//   res.status(200).json({ status: "Success" });
// });

router.get("/users", adminAuth, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ users });
  });
});

// Register route

router.post(
  "/register",
  adminAuth,
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Include a Valid Email").isEmail(),
    check("phone", "Phone Number can't be empty")
      .not()
      .isEmpty()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      .withMessage("Enter a Valid Phone NUmber"),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      saltRounds = 11;
      const { name, email, password, phone } = req.body;

      let userExists = await User.findOne({ email });

      if (userExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
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
            .json({ msg: "Validation failed, Please check the fields" });
        }
      });

      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

// Update user

router.put(
  "/register",
  adminAuth,
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Include a Valid Email").isEmail(),
    check("phone", "Phone Number can't be empty")
      .not()
      .isEmpty()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      .withMessage("Enter a Valid Phone Number"),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Validation
    saltRounds = 11;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, phone } = req.body;

      // console.log(_id);

      let userExists = await User.findOne({ email });

      if (!userExists) {
        return res.status(400).json({ errors: [{ msg: "User not found" }] });
      }

      // const user = new User({
      //   name,
      //   email,
      //   password,
      //   phone,
      // });

      userExists.name = name;
      userExists.email = email;
      userExists.password = password;
      userExists.phone = phone;

      const hash = await bcrypt.hash(password, saltRounds);

      userExists.password = hash;

      console.log(userExists);

      User.findOneAndUpdate({ email }, userExists, (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Validation failed, Please check the fields" });
        }
        res.status(200).json({ msg: "User updated" });

        // else {
        //   const payload = {
        //     user: {
        //       id: userExists.id,
        //       name: userExists.name,
        //       email: userExists.email,
        //       phone: userExists.phone,
        //     },
        //   };

        //   jwt.sign(
        //     payload,
        //     config.get("jwtSecret"),
        //     { expiresIn: 360000 },
        //     (err, token) => {
        //       if (err) {
        //         console.log(err);
        //       }
        //       res.status(200).json({ token });
        //     }
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

// Delete a User

router.delete("/users/:id", adminAuth, async (req, res) => {
  const id = req.params.id;

  try {
    let userExists = await User.findOne({ _id: id });

    if (userExists) {
      User.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.status(500).send("Server error");
        } else {
          res.status(200).json({ msg: "Delete Success" });
        }
      });
    } else {
      return res.status(404).json({ errors: [{ msg: "User Not found" }] });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
