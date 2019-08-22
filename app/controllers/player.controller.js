const Player = require('../models/player.model.js');

exports.findAll = (req, res) => {
    Player.find()
        .then( players => {
            res.send(players);
        })
        .catch( err => {
            res.status(500).send('could not retrieve basketball players');
        });
};