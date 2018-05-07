const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/company');
const Student = require('../models/student');
const Person = require('../models/person');
const Examwork = require('../models/examwork');
const Course = require('../models/course');

const db = "mongodb://firstcontact:projectex1@ds113849.mlab.com:13849/projectex";
mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error("error!" + err);
    }
});

//#region Student API

router.get('/students', (req, res) => {
    console.log('get request for all students');
    var populateQuery = [{ path: 'person', model: 'person' }, { path: 'courses', model: 'course' }];
    Student.find({}).populate(populateQuery).exec((err, students) => {
        if (err) {
            console.log('Error retrieving students: ' + err);
        } else {
            res.json(students);
        }
    });
});

router.get('/students/:id', (req, res) => {
    console.log("Get request for one student: " + req.params.id);
    var populateQuery = [{ path: 'person', model: 'person' }, { path: 'courses', model: 'course' }];
    Student.findById(req.params.id).populate(populateQuery).exec((err, student) => {
        if (err) {
            console.log('Error retrieving student with id:' + req.params.id + '. ' + err);
        } else {
            console.log('Found it: ' + student);
        }
        res.json(student);
    });

});

router.post('/student', (req, res) => {
    console.log('Post a student');

    const courseIds = [];
    req.body.courseIds.forEach(courseId => {
        courseIds.push(new mongoose.Types.ObjectId(courseId));
    });

    var newStudent = new Student({
        person: new mongoose.Types.ObjectId(req.body.personId),
        name: req.body.name,
        education: req.body.education,
        examYear: req.body.examYear,
        description: req.body.description,
        skills: req.body.skills,
        courses: courseIds
    });

    newStudent.save((err, insertedStudent) => {
        if (err) {
            console.log('Error saving student ' + err);
        } else {
            console.log('saving student');
            res.json(insertedStudent);
        }
    });
});

router.put('/student/:id', (req, res) => {
    console.log('Update student with id: ' + req.params.id);
    Student.findByIdAndUpdate(req.params.id,
        {
            $set: {
                education: req.body.education,
                examYear: req.body.examYear,
                description: req.body.description,
                skills: req.body.skills,
                courses: req.body.courses
            }
        },
        {
            new: true
        },
        (err, updatedStudent) => {
            if (err) {
                res.send('Error updating student: ' + err);
            } else {
                res.json(updatedStudent);
            }
        }
    );
});

router.delete('/student/:id', (req, res) => {
    console.log('Delete a student');
    Student.findByIdAndRemove(req.params.id, (err, deletedStudent) => {
        if (err) {
            console.log('Error deleting student' + err);
            res.send('Error deleting student' + err);
        } else {
            console.log('Deleting student: ' + deletedStudent);
            res.json(deletedStudent);
        }
    });
});


//#endregion

//#region Person API

router.get('/persons', (req, res) => {
    console.log('Get request for persons');
    Person.find({}).exec((err, persons) => {
        if (err) {
            console.log('Error retrieving persons: ' + err);
        } else {
            res.json(persons);
        }
    });
})

router.post('/person', (req, res) => {
    console.log('Post a person');
    var newPerson = new Person({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNbr: req.body.phoneNbr
    });

    newPerson.save((err, insertedPerson) => {
        if (err) {
            console.log('error saving person ' + err);
        }

        console.log('saving person');

        res.json(insertedPerson);
    });
});

router.delete('/person/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, (err, deletedPerson) => {
        if (err) {
            console.log('Error person: ' + deletedPerson);
            res.send('Error deleting person');
        } else {
            console.log('Deleting person: ' + deletedPerson);
            res.json(deletedPerson);
        }
    });
});

//#endregion

//#region Course API

router.post('/course', (req, res) => {
    console.log('Post a course');
    var newCourse = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        points: req.body.points,
    });

    newCourse.save((err, insertedCourse) => {
        if (err) {
            console.log('error saving course ' + err);
        }

        console.log('saving course');

        res.json(insertedCourse);
    });
});

router.get('/courses', (req, res) => {
    console.log('Get request for courses');
    Course.find({}).exec((err, courses) => {
        if (err) {
            console.log('Error retrieving courses: ' + err);
        } else {
            res.json(courses);
        }
    });
})

router.get('/courses/:name', (req, res) => {
    console.log("Get request for one course: " + req.params.name);
    Course.findOne({ name: req.params.name }).exec((err, course) => {
        if (course === null) {
            console.log('Error retrieving course with name:' + req.params.name + '. ' + err);
        } else {
            console.log('Found it: ' + course);
        }
        res.json(course);
    });

});

router.delete('/course/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, (err, deletedCourse) => {
        if (err) {
            console.log('Error deleting course: ' + deletedCourse);
            res.send('Error deleting course');
        } else {
            console.log('Deleting course: ' + deletedCourse);
            res.json(deletedCourse);
        }
    });
});

//#endregion

//#region Company API

router.get('/companies', function (req, res) {
    console.log('get request for all companies');
    Company.find({})
        .exec(function (err, companies) {
            if (err) {
                console.log('error retrieving companies' + err);
            } else {
                res.json(companies);
            }
        });
});

router.get('/companies/:id', function (req, res) {
    console.log('get request for a single video');
    Company.findById(req.params.id)
        .exec(function (err, company) {
            if (err) {
                console.log('error retrieving companies' + err);
            } else {
                res.json(company);
            }
        });
});

router.post('/company', function (req, res) {
    console.log('Post a company');
    var newCompany = new Company();
    newCompany.name = req.body.name;
    newCompany.url = req.body.url;
    newCompany.description = req.body.description;
    newCompany.save(function (err, insertedCompany) {
        if (err) {
            console.log('Error saving company' + err);
        } else {
            res.json(insertedCompany);
            console.log('Company saved');
        }
    });
});

router.put('/company/:id', function (req, res) {
    console.log('update a company');
    Company.findByIdAndUpdate(req.params.id,
        {
            $set: { name: req.body.name, description: req.body.description }
        },
        {
            new: true
        },
        function (err, updatedCompay) {
            if (err) {
                res.send("Error updating company");
            } else {
                res.json(updatedCompay);
            }
        }

    );
});

router.delete('/company/:id', function (req, res) {
    console.log('Deleting a company');
    Company.findByIdAndRemove(req.params.id, function (err, deletedCompany) {
        if (err) {
            res.send("Error deleting company");
        } else {
            res.json(deletedCompany);
        }
    });
});

//#endregion


//#region examwork API

router.get('/examworks', function (req, res) {
    console.log('get request for all exam works');
    Examwork.find({})
        .exec(function (err, examworks) {
            if (err) {
                console.log('error retrieving exam works' + err);
            } else {
                res.json(examworks);
            }
        });
});


router.post('/examwork', function (req, res) {
    console.log('Post an exam work');

    var newExamWork = new Examwork();
    newExamWork.title = req.body.title;
    newExamWork.location = req.body.location;
    newExamWork.applyDueDate = req.body.applyDueDate;
    newExamWork.essentialSkills = req.body.essentialSkills;
    newExamWork.complementarySkills = req.body.complementarySkills;
    newExamWork.description = req.body.description;
    newExamWork.teachings = req.body.teachings;
    newExamWork.contact = req.body.contact;
    newExamWork.company = req.body.company;

    newExamWork.save(function (err, insertedExamwork) {
        if (err) {
            console.log('Error saving exam work' + err);
        } else {
            res.json(insertedExamwork);
            console.log('Exam work saved');
        }
    });
});

router.delete('/examwork/:id', function (req, res) {
    console.log('Deleting exam work');
    Company.findByIdAndRemove(req.params.id, function (err, deletedExamwork) {
        if (err) {
            res.send("Error deleting exam work");
        } else {
            res.json(deletedCompany);
            console.log('Exam work deleted');
        }
    });
});

router.put('/examwork/:id', function (req, res) {
    console.log('update examwork');
    Company.findByIdAndUpdate(req.params.id,
        {
            $set: {
                title: req.body.title,
                location: req.body.location,
                applyDueDate: req.body.applyDueDate,
                essentialSkills: req.body.essentialSkills,
                complementarySkills: req.body.complementarySkills,
                description: req.body.description,
                teachings: req.body.teachings,
                contact: req.body.contact,
                company: req.body.company
            }
        },
        {
            new: true
        },
        function (err, updatedExamwork) {
            if (err) {
                res.send("Error updating exam work");
            } else {
                res.json(updatedExamwork);
                console.log('Exam work updated');
            }
        }

    );
});

//#endregion
module.exports = router;