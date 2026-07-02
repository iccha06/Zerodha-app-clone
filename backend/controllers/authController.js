const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    await UserModel.findByIdAndUpdate(user._id, {
  lastSeen: new Date(),
  status: "Active",
});
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({
      token,
      username: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};const logout = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      status: "Inactive",
      lastSeen: new Date(),
    });

    res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const heartbeat = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      lastSeen: new Date(),
      status: "Active",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  register,
  login,logout,heartbeat,getCurrentUser
};