const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
//@desc Get all students
//@route GET /api/students
//@access private
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ user_id: req.user.id });
  res.status(200).json(students);
});

//@desc Create New student
//@route POST /api/students
//@access private
const createStudent = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const student = await Student.create({
    name,
    email,
    phone,
    user_id:req.user.id,
  });

  res.status(201).json(student);
});

//@desc Get student
//@route GET /api/students/:id
//@access private
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json(student);
});

//@desc Update student
//@route PUT /api/students/:id
//@access private
const updateStudent = asyncHandler(async (req,res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  if (student.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user students");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedStudent);
});

// const updateContact = asyncHandler(async(req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if(!contact){
//     res.status(404);
//     throw new Error("contact not found");
//   }
//   if(contact.user_id.toString() !== req.user.id){
//     res.status(403);
//     throw new Error("user dont have to permission to update other users contact!")
//   }
//     const updatedContact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true}
//     );
//    res.status(200).json(updatedContact);
// }) ;

// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error("User don't have permission to update other user contacts");
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });


//@desc Delete Student
//@route DELETE /api/students/:id
//@access private
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  if (student.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user students");
  }
  await Student.deleteOne({ _id: req.params.id });
  res.status(200).json(student);
});

module.exports = {
  getStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
