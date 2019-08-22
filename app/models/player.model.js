const mongoose = require('mongoose');

const PlayerSchema  = mongoose.Schema({
    year: Number,
    age: Number,
    pos: String,
    team_id: String,
    lg_id: String,
    g: Number,
    mp_per_g: Number,
    fg_per_g: Number,
    fga_per_g: Number,
    fg_pct: Number
});

module.exports = mongoose.model('Player', PlayerSchema);