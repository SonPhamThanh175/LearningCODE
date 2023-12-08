var express = require('express');
var router = express.Router();

// const news... đối tượng được khởi tạo từ class News... nên k cần viết hoa
const newsController = require('../app/controllers/NewsController');

// newsController.index

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
