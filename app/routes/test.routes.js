module.exports = (app) => {
    const tests = require('../controllers/test.controller.js');

    // Create a new Note
    app.post('/tests', tests.create);

    // Retrieve all Notes
    app.get('/tests', tests.findAll);

    // Retrieve a single Note with noteId
    app.get('/tests/:testId', tests.findOne);

    // Update a Note with noteId
    app.put('/tests/:testId', tests.update);

    // add new form
    app.post('/form/db', tests.form);

    // Delete a Note with noteId
    app.delete('/tests/:testId', tests.delete);
}