const User = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, email, password: hash });
    res.json({ user });
  } else {
    res.status(400).send({ message: "All fields are required" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKENSTRING,
          { expiresIn: "2h" }
        );
        user.token = token;
        await user.save();
        res.json(user);
      } else {
        res.status(401).json({ message: "Password is not correct" });
      }
    }
  } else {
    res.status(400).send({ message: "All fields are required" });
  }
};
