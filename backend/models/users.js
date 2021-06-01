const { Users } = require('../utils/db');

const findUser = (username) => {
  return Users.findOne({ username });
}

const signup = ( {username, password} ) => {
  const user = new Users({
    username,
    password
  });
  return user.save();
};

const findUserList = () => {
  return Users.find({}, { password: 0 }).sort({ _id: -1 });
}

const deleteUser = id => {
  // return Users.deleteOne({ id });
  // return Users.findByIdAndRemove(id);
  return Users.deleteOne({ _id: id });
}

exports.signup = signup;
exports.findUser = findUser;
exports.findUserList = findUserList;
exports.deleteUser = deleteUser;