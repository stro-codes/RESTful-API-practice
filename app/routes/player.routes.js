module.exports = (app) => {
   
    const players = require('../controllers/player.controller.js');

    // get to grab entire database of players
    app.get('/players', players.findAll);

    // post to add new player to database
    //app.post('/players', players.create);

}