const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

let DUMMY_USERS = [
  {
    id: "u1",
    fullname: "harisliv",
    password: "1234",
    email: "harisliv@gmail.com",
  },
];

const signup = (req, res, next) => {
  const { fullname, password, email } = req.body;
  const newUser = new User(uuidv4(), fullname, password, email);
  const users = newUser.fetch();
  console.log(users);
  if (users.find((user) => user.email === newUser.email)) {
    return next(new HttpError("User Already exists", 404));
  }
  newUser.save();
  res.status(201).json({ message: "User Created Succesfully", user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        "Could not identidy user, User credentials seem to be wrong",
        404
      )
    );
  }
  req.session.isLoggedIn = true;
  res.status(200).json({ message: "Succesfull Log In" });
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.status(200).json({ message: "Logged Out" });
};

const getUsers = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.json({ users: DUMMY_USERS });
  } else {
    res.json({ message: "Please log in first!" });
  }
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.getUsers = getUsers;
