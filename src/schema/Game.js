const mongoose = require("mongoose");
const Game = mongoose.model("game", new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique:false
    },
    genre: {
        type: String,
        required: true,
        unique:false
    },
    series: {
        type: String,
        required: true,
        unique:false
    },
    release: {
        type: Number,
        required: true,
        unique:false
    },
    title: {
        type: String,
        required: true,
        unique:true
    }
}));
module.exports = Game;