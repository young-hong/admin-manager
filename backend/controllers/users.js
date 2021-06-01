const usersModel = require('../models/users');
const md5 = require('md5');
const { sign, verify } = require('../utils/tools');
//const { json } = require('express');
// const jwt = require('jsonwebtoken');
// const path = require('path');
// const fs = require('fs');

//用户注册
const signup = async (req, res, next) => {
  //res.send('hello');
  res.set('content-type','application/json; charset=utf-8');
  const { username, password } = req.body;

  let findResult = await usersModel.findUser(username);

  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户已存在'
      })
    })
  } else {
    await usersModel.signup({
      username,
      password: md5(password)
    })
    res.render('success', {
      data: JSON.stringify({
        message: '用户注册成功'
      })
    })  
  } 
}

//用户登录
const signin = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  const { username, password } = req.body;
  let result = await usersModel.findUser(username);
  if (result) {
    // let { password } = result;
    if (md5(password) === result.password) {
      // req.session.username = username;
      const token = sign(username);
      //res.set('X-Access-Token', token);
      res.set('authorization', token);
      res.set('Access-Control-Expose-Headers', 'authorization');
      res.render('success', {
        data: JSON.stringify({
          username
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '密码错误'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名错误'
      })
    })
  }
}

//退出登录
const signout = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  req.session = null;
  res.render('success', {
    data: JSON.stringify({
      message: '成功退出登录'
    })
  })
}

//用户列表
const userList = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  const listResult = await usersModel.findUserList();
  res.render('success', {
    data: JSON.stringify(listResult)
  })
}

//用户删除
const deleteUser = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  const { id } = req.body;
  
  let result = await usersModel.deleteUser(id);
  if (result) {
    res.render('success', {
      data: JSON.stringify({
        message: '用户删除成功'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户删除失败'
      })
    })
  }
  
}

const isAuth = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  let token = req.get('authorization');
  try {
    let result = verify(token);
    res.render('success', {
      data: JSON.stringify({
        username: result.username
      })
    })
  } catch(e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录'
      })
    })
  }
  
  // if (req.session.username) {
  //   res.render('success', {
  //     data: JSON.stringify({
  //       username: req.session.username
  //     })
  //   })
  // } else {
  //   res.render('fail', {
  //     data: JSON.stringify({
  //       message: '请登录'
  //     })
  //   })
  // }
}

// const token = async (req, res, next) => {
//   res.set('content-type','application/json; charset=utf-8');
//   //对称加密
//   // const signToken = jwt.sign({ username: 'admin' }, 'abc');
//   // const decoded = jwt.verify(signToken, 'abc');
//   // console.log(decoded);

//   //非对称加密
//   //生成密钥
//   //openssl
//   //openssl > genrsa -out rsa_private_key.pem 2048
//   //根据私钥生成公钥
//   //openssl > rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
//   const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
//   const signToken = jwt.sign({ username: 'admin' }, privateKey, { algorithm: 'RS256' });
//   const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
//   const result = jwt.verify(signToken, publicKey);

//   res.render('success', {
//     data: JSON.stringify({
//       message: result
//     })
//   })
// }

exports.signup = signup;
exports.userList = userList;
exports.deleteUser = deleteUser;
exports.signin = signin;
exports.signout = signout;
exports.isAuth = isAuth;
//exports.token = token;