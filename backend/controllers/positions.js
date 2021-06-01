const moment = require('moment');
const positionModel = require('../models/positions');

//职位添加
const addPosition = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  let companyLogo;
  if (req.body.avatar) {
    companyLogo = req.companyLogo;
  } else {
    companyLogo = '';
  }
  let result = await positionModel.addPosition({
    ...req.body,
    companyLogo,
    createTime: moment().unix()
  })
  
  if (result) {
    res.render('success', {
      data: JSON.stringify({
        message: '职位添加成功'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '职位添加失败'
      })
    })
  }
}

//职位列表
const positionList = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  let result = await positionModel.findPositionList();
  if (result) {
    res.render('success', {
      data: JSON.stringify(result)
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '获取职位数据失败'
      })
    })
  }
}

const deletePosition = async (req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  let result = await positionModel.deletePosition(req.body.id);
  try {
    if (result.deletedCount > 0) {
      res.render('success', {
        data: JSON.stringify({
          message: '职位删除成功'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '职位删除失败, ID错误'
        })
      })
    }
  } catch (error) {
    res.render('fail', {
      data: JSON.stringify({
        message: '职位删除失败'
      })
    })
  }
}

//编辑职位
const updatePosition = async(req, res, next) => {
  res.set('content-type','application/json; charset=utf-8');
  let result = await positionModel.updatePosition({
    ...req.body,
    companyLogo: req.companyLogo,
   // createTime: moment().unix()
  })
  
  if (result) {
    res.render('success', {
      data: JSON.stringify({
        message: '职位编辑成功'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '职位编辑失败'
      })
    })
  }
}

const uploadPic = async(req, res, next) => {
  res.render('success', {
    data: JSON.stringify({
      message: '图片上传成功'
    })
  })
}

exports.addPosition = addPosition;
exports.positionList = positionList;
exports.deletePosition = deletePosition;
exports.uploadPic = uploadPic;
exports.updatePosition = updatePosition;