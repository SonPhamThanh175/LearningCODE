var express = require('express');
var router = express.Router();

// const news... đối tượng được khởi tạo từ class News... nên k cần viết hoa
const newsController = require('../app/controllers/NewsController');

// newsController.index

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;
