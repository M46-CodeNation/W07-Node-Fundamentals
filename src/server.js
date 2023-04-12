const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./db/connection");

// =====================================================================
//  Meta Data
// =====================================================================

// Configuration
const app = express()
    .use(express.json());

// Schema
const Game = require("./schema/Game");

// Data
let games =
    [
        { genre: "Point & Click Adenture", slug: "mi1", series: "Monkey Island", release: 1, title: "Monkey Island 1: The Secret of Monkey Island" },
        { genre: "Point & Click Adenture", slug: "mi2", series: "Monkey Island", release: 2, title: "Monkey Island 2: LeChuck's Revenge" },
        { genre: "Point & Click Adenture", slug: "mi3", series: "Monkey Island", release: 3, title: "Monkey Island 3: The Curse of Monkey Island" },
        { genre: "Point & Click Adenture", slug: "mi4", series: "Monkey Island", release: 4, title: "Monkey Island 4: Escape from Monkey Island" },
        { genre: "Point & Click Adenture", slug: "mi5", series: "Monkey Island", release: 5, title: "Monkey Island 5: Tales of Monkey Island" },
        { genre: "Point & Click Adenture", slug: "dw1", series: "Discworld", release: 1, title: "Discworld" },
        { genre: "Point & Click Adenture", slug: "dw2", series: "Discworld", release: 2, title: "Discworld II: Missing, Presumed..." },
        { genre: "Point & Click Adenture", slug: "dw3", series: "Discworld", release: 3, title: "Discworld Noir" },
        { genre: "Point & Click Adenture", slug: "gk1", series: "Gabriel Knight", release: 1, title: "Gabriel Knight 1: Sins of the Father" },
        { genre: "Point & Click Adenture", slug: "gk2", series: "Gabriel Knight", release: 2, title: "Gabriel Knight 2: The Beast Within" },
        { genre: "Point & Click Adenture", slug: "gk3", series: "Gabriel Knight", release: 3, title: "Gabriel Knight 3: Blood of the Sacred, Blood of the Damned" },
    ];

// =====================================================================
//  Games Routes
// =====================================================================

// POST: /games
app.post("/games/addgame", async (request, response) =>
{
    // Create a new entry in the collection.
    const game = await Game.create({
        slug: request.body.slug,
        genre: request.body.genre,
        series: request.body.series,
        release: request.body.release,
        title: request.body.title,
    });

    // Send a response to the client.
    response.status(201).json({
        status: "OK",
        data: game
    }).end();
});

// =====================================================================
//  Running The Server
// =====================================================================

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));