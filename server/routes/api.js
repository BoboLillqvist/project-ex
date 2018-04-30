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

mongoose.connect(db, function(err){
    if(err){
        console.error("error!" + err);
    }
});

//TODO: Lägga till API för studenter get all, get by id, post, update, delete

//#region Student API

router.get('/students', function(req, res){
    console.log('get request for all students');
    var populateQuery = [{path:'person'}, {path:'courses', model:'course'}];
    Student.find({}).populate(populateQuery).exec(function(err, students){
        if(err){
            console.log('Error retrieving students: ' + err);
        }else {
            res.json(students);
        }
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

    newStudent.save( (err, insertedStudent) => {
        if(err) {
            console.log('Error saving student ' + err);
        } else {
            console.log('saving student');
            res.json(insertedStudent);
        }
    }); 
});


//#endregion

//#region Person API

router.post('/person', function(req, res){
    console.log('Post a person');
    var newPerson = new Person({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNbr: req.body.phoneNbr
    });
    
    newPerson.save(function(err, insertedPerson) {
        if(err) {
            console.log('error saving person ' + err);
        }
        
        console.log('saving person');

        res.json(insertedPerson);
    });
});

//#endregion

//#region Course API

router.post('/course', function(req, res){
    console.log('Post a course');
    var newCourse = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        points: req.body.points,
    });
    
    newCourse.save(function(err, insertedCourse) {
        if(err) {
            console.log('error saving course ' + err);
        }
        
        console.log('saving course');

        res.json(insertedCourse);
    });
});

//#endregion

//#region Company API

router.get('/companies', function(req, res){
    console.log('get request for all companies');
    Company.find({})
    .exec(function(err,companies){
        if(err){
            console.log('error retrieving companies'+ err);
        }else{
            res.json(companies);
        }
    });
});

router.get('/companies/:id', function(req, res){
    console.log('get request for a single video');
    Company.findById(req.params.id)
    .exec(function(err,company){
        if(err){
            console.log('error retrieving companies'+ err);
        }else{
            res.json(company);
        }
    });
});

router.post('/company', function(req, res){
    console.log('Post a company');
    var newCompany = new Company();
    newCompany.name = req.body.name;
    newCompany.url = req.body.url;
    newCompany.description = req.body.description;
    newCompany.save(function(err, insertedCompany){
        if(err){
            console.log('Error saving company' + err);
        }else{
            res.json(insertedCompany);
            console.log('Company saved');
        }
    });
});

router.put('/company/:id', function(req, res){
    console.log('update a company');
    Company.findByIdAndUpdate(req.params.id, 
    {
        $set: {name: req.body.name, description: req.body.description}
    },
    {
        new: true
    },
    function(err, updatedCompay){
        if(err){
            res.send("Error updating company");
        }else{
            res.json(updatedCompay);
        }
    }

    );
});

router.delete('/company/:id', function(req, res){
    console.log('Deleting a company');
    Company.findByIdAndRemove(req.params.id, function(err, deletedCompany){
        if(err){
            res.send("Error deleting company");
        }else{
            res.json(deletedCompany);
        }
    });
});

//#endregion


//#region examwork API

router.get('/examworks', function(req, res){
    console.log('get request for all exam works');
    Examwork.find({})
    .exec(function(err,examworks){
        if(err){
            console.log('error retrieving exam works'+ err);
        }else{
            res.json(examworks);
        }
    });
});


// TODO: samtliga variabler returnerar undefined 
router.post('/examworks', function(req, res){
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

    newExamWork.save(function(err, insertedExamwork){
        if(err){
            console.log('Error saving exam work' + err);
        }else{
            res.json(insertedExamwork);
            console.log('Exam work saved');
        }
    });
});

//#endregion
module.exports = router;