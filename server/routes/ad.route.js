let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let adsSchema = require("../Models/Ad");

// CREATE Student
router.route("/create-ad").post((req, res, next) => {
  adsSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Students
router.route("/").get((req, res) => {
  adsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single Student
router.route("/edit-ad/:id").get((req, res) => {
  adsSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
      console.log("error");
    } else {
      console.log("edited");
      res.json(data);
    }
  });
});

// Update Student
router.route("/update-ad/:id").put((req, res, next) => {
  adsSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Ad updated successfully !");
      }
    }
  );
});

// Delete Student
router.route("/delete-ad/:id").delete((req, res, next) => {
  adsSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
