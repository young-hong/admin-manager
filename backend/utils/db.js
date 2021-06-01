const mongoose = require('mongoose');
const md5 = require('md5');

mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const usersSchema = mongoose.Schema({
  username: String,
  password: String
});

const Users = mongoose.model('users', usersSchema);

Users.deleteMany({ username: 'hqq' }, (err, result) => {
  if (err) console.log(err);
  const initUser = new Users({ username: 'hqq', password: md5('123') });
  initUser.save();
})


const positionSchema = mongoose.Schema({
  companyLogo: String,
  companyName: String,
  positionName: String,
  city: String,
  createTime: String,
  salary: String
})

const Positions = mongoose.model('positions', positionSchema);

exports.Users = Users;
exports.Positions = Positions;