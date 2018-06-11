const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const utils = require('./utils');
const pages =  utils.getPage('**/*.html',path.join(__dirname,'../../src/pages'));

pages.forEach(page => {
  // router.get(page.options.filename,(req, res, next) => {
  //   console.log(req);
  //   console.log(res);
  //   //res.send(res);
  // })
})
router.all('/', (req, res) => {
  res.send('hello world');
});
router.all('*', (req, res) => {
  if (req.path.indexOf('html') !== -1) {
    
  } else {
    const file = path.join(__dirname,'../../mock' + req.path + '.js');
    fs.exists(file, (exists) => {
      if (exists) {
        res.json(require('../../mock' + req.path)());
      } else {
        res.json({
          success: true,
          msg: '成功'
        });
      }
    })
  } 
});

module.exports = router;