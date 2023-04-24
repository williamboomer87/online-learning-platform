const Course = require('../models/Course');

async function getCourses(req, res, next) {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

async function createCourse(req, res, next) {
  try {
    const { name, description } = req.body;

    const course = await Course.create({ name, description });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
}

async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.name = name;
    course.description = description;

    await course.save();
    res.json(course);
  } catch (err) {
    next(err);
  }
}

async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: '
