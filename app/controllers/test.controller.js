const Test = require('../models/test.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.address) {
        return res.status(400).send({
            message: "Test address can not be empty"
        });
    }

    // Create a Note
    const test = new Test({
        name: req.body.name || "Untitled Test", 
        address: req.body.address
    });

    // Save Note in the database
    test.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Test.find()
    .then(tests => {
        res.send(tests);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Test.findById(req.params.testId)
    .then(test => {
        if(!test) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.testId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.testId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.testId
        });
    })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.address) {
        return res.status(400).send({
            message: "Test address can not be empty"
        });
    }

    // Find note and update it with the request body
    Test.findByIdAndUpdate(req.params.testId, {
        name: req.body.name || "Untitled Test",
        address: req.body.address
    }, {new: true})
    .then(test => {
        if(!test) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.testId
            });
        }
        res.send(test);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.testId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.testId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Test.findByIdAndRemove(req.params.testId)
    .then(test => {
        if(!test) {
            return res.status(404).send({
                message: "Test not found with id " + req.params.testId
            });
        }
        res.send({message: "Test deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Test not found with id " + req.params.testId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Test with id " + req.params.testId
        });
    });
};