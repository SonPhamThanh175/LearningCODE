var express = require('express');
var router = express.Router();

// const news... đối tượng được khởi tạo từ class News... nên k cần viết hoa
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.get('/:slug', courseController.show);

module.exports = router;
