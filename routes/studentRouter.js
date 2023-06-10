const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { validate } = require("../models/studentModel");
const validateToken = require("../middleware/validateTokenHandler");


//router.use(validateToken);
// router.route("/").get(validateToken,getStudents).post(validateToken,createStudent);
// router.route("/:id").get(validateToken,getStudent).put(validateToken,updateStudent).delete(validateToken,deleteStudent);


router.post("/create",validateToken,createStudent);

router.get("/:id/",validateToken,getStudent);

router.get("/",validateToken,getStudents);

router.put("/:id",validateToken,updateStudent);

router.delete("/:id",validateToken,deleteStudent)


module.exports = router;
