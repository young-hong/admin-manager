const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime');

let filename = '';

// const upload = multer({
//   dest: path.join(__dirname, '../public/uploads')
// });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function(req, file, cb) {
    let ext = mime.getExtension(file.mimetype);
    if (file) {
      filename = file.fieldname + '-' + Date.now() + '.' + ext;
      cb(null, filename);
    }
    else {
      cb(null, '');
    }
    
  }
});

const limits = {
  fileSize: 2000000,
  files: 1
}

function fileFilter(req, file, cb) {
  const acceptType = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif'
  ];
  if( !acceptType.includes(file.mimetype)) {
    cb(new Error('文件类型必须是png,jpg,jpeg,gif'));
  } else {
    cb(null, true);
  }
}

let upload = multer({
  storage,
  limits,
  fileFilter
}).single('companyLogo');

const uploadMiddleware = (req, res, next) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      //res.status(500);
      res.render('fail', {
        data: JSON.stringify({
          message: '图片超出200k'
        })
      })
    } else if (err) {
      res.render('fail', {
        data: JSON.stringify({
          message: err.message
        })
      })
    } else {
      if (req.body.companyLogo_old) {
        const { companyLogo_old } = req.body;
        try {
          fs.unlinkSync(path.join(__dirname, `../public/uploads/${companyLogo_old}`));
        } catch(err) {
          console.log(err);
        }
      }
      req.companyLogo = filename; 
      next();
    }
    
  })
}

//const upload = multer({ storage });

exports.uploadMiddleware = uploadMiddleware;