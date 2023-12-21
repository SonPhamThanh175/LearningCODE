const Course = require('../models/Course');

const {muntipleMongooseToObject} = require('../../util/mongoose');
class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countWithDeleted({ deleted: true })])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          courses: muntipleMongooseToObject(courses),
          deletedCount,
        })
      )
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res ,next) {
    Course.findDeleted({})
      .then(courses => res.render('me/trash-courses',{
        courses: muntipleMongooseToObject(courses)
      }))
      .catch(next);    
  }
}

module.exports = new MeController();