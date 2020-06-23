const express = require("express");
const router = express.Router();
const Estimation = require("../../model/Estimations");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/me", auth, async (req, res) => {
  console.log(req);
  const user = req.user;

  res.status(200).json({ user });
});

router.get("/estimations", auth, async (req, res) => {
  // console.log(typeof req.user._id);
  const id = req.user._id;
  const estimations = await Estimation.find({ createdBy: id }, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Unexpected Error" });
    }
  });

  res.status(200).json({ estimations });
});

router.post(
  "/estimations",
  auth,
  [
    check("clientDetail.name", "Name is Required").not().isEmpty(),
    check("clientDetail.email", "Include a Valid Email").isEmail(),
    check("clientDetail.phone", "Phone Number can't be empty")
      .not()
      .isEmpty()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      .withMessage("Enter a Valid Phone Number"),
  ],
  async (req, res) => {
    // Validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { clientDetail, packageType, uom } = req.body;
      const { user: createdBy } = req;

      const estimate = new Estimation({
        clientDetail,
        createdBy,
        packageType,
      });

      if (uom) {
        estimate.uom = uom;
      }

      console.log(estimate);

      estimate.save((err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ msg: "Validation failed, Please check the fields" });
        } else {
          res.status(200).json({ msg: "Estimation Added" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

// Update current user

router.put(
  "/",
  auth,
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

      // res.status(200).json({ msg: `Current User: ${req.user}` });

      let userExists = await User.findOne({ email });

      console.log(typeof req.user._id);
      console.log(typeof userExists._id);

      if (!userExists) {
        return res.status(400).json({ errors: [{ msg: "User not found" }] });
      } else {
        if (userExists._id.toString() !== req.user._id.toString()) {
          return res.status(400).json({ errors: [{ msg: "Unauthorized" }] });
        }

        userExists.name = name;
        userExists.email = email;
        userExists.password = password;
        userExists.phone = phone;
        const hash = await bcrypt.hash(password, saltRounds);

        userExists.password = hash;

        console.log(userExists);

        User.findOneAndUpdate({ _id: userExists._id }, userExists, (err) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ msg: "Validation failed, Please check the fields" });
          } else {
            // res.status(200).json({ msg: "User updated" });
            const payload = {
              user: {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email,
                phone: userExists.phone,
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
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
