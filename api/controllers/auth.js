import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//All pass = 123
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Not using req.body bc password will be encrypt for security
    const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    //Send in4 to cookies (using jsonwebtoken) -> CREATE COOKIE
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    //Setting this token into cookies (using cookie-parser) - do it in index.js

    const { password, isAdmin, ...otherDetails } = user._doc; //Hide pass and role
    // res.status(200).json({ ...otherDetails });     //Without cookie
    res
      .cookie("access_token", token, {
        httpOnly: true, //Only allow client reach this cookie through http
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
