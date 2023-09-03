import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import token from "../models/Token.js";
dotenv.config();

// controller for signUp
const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();
    console.log(newUser);
    return response.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "error while signing up", error });
  }
};

// controller for Login
const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  console.log(user);
  if (!user) {
    return response.status(400).json({ msg: "username doesn't matched." });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRECT_KEY
      );

      const newToken = new token({ token: refreshToken });
      await newToken.save();
      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    } else {
      return response.status(400).json({ msg: "Password doesn't match" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Error occured while login to  the  page.",
    });
  }
};

export { signupUser, loginUser };
