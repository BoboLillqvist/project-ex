const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Company = require('../models/company');
const Student = require('../models/student');
const Person = require('../models/person');
const Examwork = require('../models/examwork');
const Course = require('../models/course');
const Tags = require('../models/tags');
const User = require('../models/user');

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
            console.log('Found student: ' + student.name);
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
        courses: courseIds,
        pictureID: req.body.pictureID,
        pictureURL: req.body.pictureURL
    });

    newStudent.save((err, student) => {
        if (err) {
            console.log('Error saving student ' + err);
        } else {
            console.log('saving student');
            res.status(200).send( {student} );
        }
    });
});

router.put('/student/:id', (req, res) => {
    console.log('Update student with id: ' + req.params.id);

    const courseIds = [];
    req.body.courseIds.forEach(courseId => {
        courseIds.push(new mongoose.Types.ObjectId(courseId));
    });
    
    Student.findByIdAndUpdate(req.params.id,
        {
            $set: {
                name: req.body.name,
                education: req.body.education,
                examYear: req.body.examYear,
                description: req.body.description,
                skills: req.body.skills,
                courses: courseIds,
                pictureURL: req.body.pictureURL
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
            console.log('Deleting student: ' + deletedStudent.name);
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

router.get('/persons/:id', (req, res) => {
    console.log('Get request for one person, id: ' + req.params.id);
    
    Person.findById(req.params.id).exec( (err, person) => {
        if(err) {
            console.log('Error retrieving person: ' + err);
        } else {
            res.json(person);
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

router.put('/person/:id', (req, res) => {
    console.log('Update person with id: ' + req.params.id);
    Person.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNbr: req.body.phoneNbr,
            email: req.body.email
        }
    }, {
        new: true
    }, (err, updatedPerson) => {
        if(err) {
            res.send('Error updating person' + err);
        } else {
            res.json(updatedPerson);
        }
    });
});

router.delete('/person/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, (err, deletedPerson) => {
        if (err) {
            console.log('Error deleting person: ' + err);
            res.send('Error deleting person');
        } else {
            console.log('Deleting person: ' + deletedPerson.name);
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
    var populateQuery = [{ path: 'examWorks', model: 'examwork' }];
    Company.find({}).populate(populateQuery).exec(function (err, companies) {
            if (err) {
                console.log('error retrieving companies' + err);
            } else {
                res.json(companies);
            }
        });
});

router.get('/companies/:id', function (req, res) {
    console.log('get request for a single company');
    var populateQuery = [{ path: 'examWorks', model: 'examwork' }];
    Company.findById(req.params.id).populate(populateQuery)
        .exec(function (err, company) {
            if (err) {
                console.log('error retrieving companies: ' + err);
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
    newCompany.pictureID = req.body.pictureID;
    newCompany.pictureURL = req.body.pictureURL;
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
            $set: { name: req.body.name, 
                    url: req.body.url, 
                    description: req.body.description, 
                    pictureURL: req.body.pictureURL 
            }
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
    var populateQuery = [{ path: 'contact', model: 'person' }, { path: 'company', model: 'company' }];
    Examwork.find({}).populate(populateQuery)
        .exec(function (err, examworks) {
            if (err) {
                console.log('error retrieving exam works' + err);
            } else {
                res.json(examworks);
            }
        });
});

router.get('/examworks/:id', function (req, res) {
    console.log('get request for a single exam work');
    var populateQuery = [{ path: 'contact', model: 'person' }, { path: 'company', model: 'company' }];
    Examwork.findById(req.params.id).populate(populateQuery)
        .exec(function (err, examwork) {
            if (err) {
                console.log('error retrieving exam work' + err);
            } else {
                res.json(examwork);
            }
        });
});

router.post('/examwork', function (req, res) {
    console.log('Post an exam work');

    var newExamWork = new Examwork();
    newExamWork.title = req.body.title;
    newExamWork.location = req.body.location;
    newExamWork.essentialSkills = req.body.essentialSkills;
    newExamWork.complementarySkills = req.body.complementarySkills;
    newExamWork.description = req.body.description;
    newExamWork.applyDueDate = req.body.applyDueDate;
    newExamWork.presence = req.body.presence;
    newExamWork.teachings = req.body.teachings;
    newExamWork.contact = new mongoose.mongo.ObjectId('5af94b79af22a127ea036673'),
    newExamWork.company = new mongoose.mongo.ObjectId('5ae2b45513ed9310c06691a9'),

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
    process.stdout.write('Updating examwork.. ');
    Examwork.findByIdAndUpdate(req.params.id,
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
        function (error, updatedExamwork) {
            if (error) {
                res.send('error: ' + error);
            } else {
                res.json(updatedExamwork);
                console.log('succeeded!');
            }
        }
    );
});

//#endregion

// #region Tags API
router.get('/tags', function (req, res) {
    console.log('get request for all tags');
    Tags.find({})
        .exec(function (err, tags) {
            if (err) {
                console.log('error retrieving tags' + err);
            } else {
                res.json(tags);
            }
        });
});

router.put('/tags:id', function(req, res) {
    console.log('Updating available tags..');
    Tags.findByIdAndUpdate(req.params.id,
    {
        $set: {
            type: req.body.type,
            values: req.body.values
        }
    },
    {
        new: true
    },
    function (error, updatedTags) {
        if (error) {
            res.send('error updating tags: ' + error);
        } else {
            res.json(updatedTags);
            console.log('succeeded!');
        }
    })
});
// #endregion

//#region User API

// skapa payload till jwt
function getPayload(username, role, roleId) {
    return payload = { 
        subject: 'user',
        name: username,
        role: role,
        roleId: roleId,
        exp: (new Date().getTime() + 120 * 60 * 1000)/1000 // 2h
    };
}

router.post('/register', (req, res) => {
    console.log('Post new user');

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.role = req.body.role;
    newUser.roleId = req.body.roleId;

    newUser.setPassword(req.body.password, (hash) => {
        newUser.password = hash;
        newUser.save( (err, user) => {
            if (err) {
                console.log('Error registrering user: ' + err);
                // username finns redan
                if (err.code === 11000) {
                    res.status(406).send( { err } )
                } else {
                    res.status(400).send( { err } );
                }
                
            } else {
                // fixa jwt-token
                let payload = getPayload(user.username, user.role, user.roleId);

                jwt.sign(payload, 'ohhSecret', (err, token) => {

                    if (err) {
                        console.log('error creating token');
                        res.status(400).send( {err} );
                    }

                    console.log('new user added');

                    res.status(200).send( { 
                        token,
                        user,
                        expiresIn: payload.exp
                    });
                });
            }
        });
    });

    
});

router.post('/login', (req, res) => {
    console.log('login with username: ' + req.body.username);

    User.findOne({ username: req.body.username}, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).send('error');
        }

        if (!user) {
            console.log('User not found: ' + req.body.username);
            return res.status(401).send('invalid login');
        }

        user.validPassword(req.body.password, user.password, (isValid) => {
            // wrong password
            if(!isValid){
                console.log('invalid password');
                return res.status(401).send('invalid login');
            } else {
                // everything good, create and send token
                let payload = getPayload(user.username, user.role, user.roleId);
                jwt.sign(payload, 'ohhSecret', (err, token) => {

                    if (err) {
                        console.log('error creating token');
                        res.status(400).send( {err} );
                    }

                    console.log('Login successful: ' + user.username);;

                    res.status(200).send( { 
                        token,
                        user,
                        expiresIn: payload.exp
                    });
                });
            }
        });
    });
});

router.put('/user/:id', (req, res) => {
    console.log('update user roleId');
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            roleId: req.body.roleId,
        }
    }, {
        new: true
    }, (err, updatedUser) => {
        if(err) {
            res.status(400).send('Error updating person' + err);
        } else {
            res.status(200).send({ id: updatedUser._id })
        }
    });
});


//#endregion


module.exports = router;
