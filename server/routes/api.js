const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/company');
const Student = require('../models/student');

const db = "mongodb://firstcontact:projectex1@ds149865.mlab.com:49865/projex";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("error!" + err);
    }
});

//TODO: Lägga till API för studenter get all, get by id, post, update, delete

/* Student API */
//#region Student

router.get('/students', function(req, res){
    console.log('get request for all students');
    Student.find({}).exec(function(err, students){
        if(err){
            console.log('Error retrieving students');
        }else {
            res.json(students);
        }
    })
})

//#endregion

/* Company API */
//#region Company

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

//#endregion


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
    newCompany.description = req.body.description;
    newCompany.save(function(err, insertedCompany){
        if(err){
            console.log('Error saving company');
        }else{
            res.json(insertedCompany);
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


module.exports = router;