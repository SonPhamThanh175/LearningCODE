const Course = require("../models/Course");
const express = require('express');

const {
  muntipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class CourseController {
  // [GET] /courses/slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }
  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST] /courses/store
  async store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
    const course = new Course(formData);
    await course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }
  // [PUT] /courses/:id
  async update(req, res, next) {
    await Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  // [DELETE] /courses/:id
  async delete(req, res, next) {
    await Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /courses/:id/force
  async forceDelete(req, res, next) {
    try {
      // Kiểm tra xem req.params có tồn tại và có chứa id không
      if (!req.params || !req.params.id) {
        return res.status(400).json({ error: "Invalid request" });
      }

      // Xóa course dựa trên _id
      await Course.deleteOne({ _id: req.params.id });

      // Chuyển hướng về trang trước đó
      res.redirect("back");
    } catch (error) {
      // Bắt và xử lý lỗi
      console.error(error);
      next(error); // Chuyển lỗi đến middleware xử lý lỗi tiếp theo
    }
  }

  // [PATCH] /courses/:id/restore
  
  // restore(res,req,next){
  //   Course.restore({_id : req.params.id })
  //    .then(() => res.redirect('back'))
  //    .catch(next)
  // }
  // restore(res,req,next){
  //   Course.findWithDeleted({ deleted: true })
  //   .then((courses) => {
  //     res.render("me/trash-courses",
  //       { courses: mutipleMongooseToObject( courses ),
  //     });
  //   })
  //   .catch(next);
  // }
  async restore(req, res, next) {
    try {
      // Kiểm tra xem req.params có tồn tại và có chứa id không
      if (!req.params || !req.params.id) {
        return res.status(400).json({ error: "Invalid request" });
      }

      // Khôi phục (restore) course dựa trên _id
      await Course.restore({ _id: req.params.id });

      // Chuyển hướng về trang trước đó
      res.redirect("back");
    } catch (error) {
      // Bắt và xử lý lỗi
      console.error(error);
      next(error); // Chuyển lỗi đến middleware xử lý lỗi tiếp theo
    }
  }
  // [POST] /courses/handle-form-actions
  handleFormActions(res,req,next) {
    res.json(req.body);
  }
}

module.exports = new CourseController();
