const { verify } = require('../utils/tools');

const auth =  (req, res, next) => {
  let token = req.get('authorization');
  try {
    let result = verify(token);
    next();   
  } catch(e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录'
      })
    })
  }
  // console.log(2132121, req.session.username)
  // if (req.session.username) {
  //   next()
  // } else {
  //   res.render('fail', {
  //     data: JSON.stringify({
  //       message: '请登录'
  //     })
  //   })
  // }
}

exports.auth = auth;