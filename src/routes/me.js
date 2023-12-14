var express = require('express');
var router = express.Router();

// const news... đối tượng được khởi tạo từ class News... nên k cần viết hoa
const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
