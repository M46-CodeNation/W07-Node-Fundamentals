const express = require("express");

// Configuration
const app = express()
    .use(express.json());

// Data
let games =
    [
        { id: "bfb551f0-41ac-4286-881b-54186a48bdfa", slug: "mi1", series: "Monkey Island", release: 1, title: "Monkey Island 1: The Secret of Monkey Island" },
        { id: "0f053801-786b-4966-a307-924f006e2733", slug: "mi2", series: "Monkey Island", release: 2, title: "Monkey Island 2: LeChuck's Revenge" },
        { id: "b31c6a9b-e94f-420a-bdb1-952b028bf629", slug: "mi3", series: "Monkey Island", release: 3, title: "Monkey Island 3: The Curse of Monkey Island" },
        { id: "5c0122f4-7b7a-4a81-9524-23a005d7d8ed", slug: "mi4", series: "Monkey Island", release: 4, title: "Monkey Island 4: Escape from Monkey Island" },
        { id: "f4b55770-e8c9-4266-adb9-ca11f5259496", slug: "mi5", series: "Monkey Island", release: 5, title: "Monkey Island 5: Tales of Monkey Island" },
        { id: "3c367bfd-417f-4c15-945a-199851f79334", slug: "dw1", series: "Discworld", release: 1, title: "Discworld" },
        { id: "8bedcba5-b882-4a4a-8559-45c54c2326e0", slug: "dw2", series: "Discworld", release: 2, title: "Discworld II: Missing, Presumed..." },
        { id: "2d111ef9-a93d-49fe-8264-948ea8cc20a9", slug: "dw3", series: "Discworld", release: 3, title: "Discworld Noir" },
        { id: "f566edb3-45bf-4d39-867a-06e775795de2", slug: "gk1", series: "Gabriel Knight", release: 1, title: "Gabriel Knight 1: Sins of the Father" },
        { id: "bab25fd3-f5c3-4372-b172-41fe3a281431", slug: "gk2", series: "Gabriel Knight", release: 2, title: "Gabriel Knight 2: The Beast Within" },
        { id: "376f60f9-5848-4ecd-b14b-6d16f5e30cff", slug: "gk3", series: "Gabriel Knight", release: 3, title: "Gabriel Knight 3: Blood of the Sacred, Blood of the Damned" },
    ];

// =====================================================================
//  Game Routes
// =====================================================================

// GET: /game
app.get("/game", (request, response) =>
{
    const game = games.find(p => p.id == request.query.id);
    if (game == null)
    {
        response.sendStatus(404);
        return;
    }

    response.send({
        status: "OK",
        data: game
    });
});

// GET: /game/random
app.get("/game/random", (_, response) =>
{
    response.send({
        status: "OK",
        data: games[Math.floor(Math.random() * games.length)]
    });
});

// GET: /game/:slug
app.get("/game/:slug", (request, response) =>
{
    const game = games.find(p => p.slug == request.params.slug);
    if (game == null)
    {
        response.sendStatus(404);
        return;
    }

    response.send({
        status: "OK",
        data: game
    });
});

// PUT: /game/:id
app.put("/game/:id", (request, response) =>
{
    const id = request.params.id;
    const newGame = {
        id: request.body.id,
        slug: request.body.slug,
        series: request.body.series,
        release: request.body.release,
        title: request.body.title,
    };

    if (games.find(p => p.id == id) == null) {
        games.push(newGame);
    } else {
        games = games.map(g => g.id != id ? g : newGame);
    }

    response.send({
        status: "OK",
        data: newGame
    });
});

// PATCH: /game/:id
app.patch("/game/:id", (request, response) =>
{
    const id = request.params.id;
    if (games.find(p => p.id == id) == null)
    {
        response.sendStatus(404);
        return;
    }

    games = games.map(g => g.id != id ? g : {
        id: g.id,
        slug: request.body.slug ?? g.slug,
        series: request.body.series ?? g.series,
        release: request.body.release ?? g.release,
        title: request.body.title ?? g.title,
    });

    response.send({
        status: "OK",
        data: games.find(p => p.id == id)
    });
});

// DELETE: /game/:id
app.delete("/game/:id", (request, response) =>
{
    const game = games[request.params.id];
    games = games.filter(p => p.id != request.params.id);

    response.send({
        status: "OK",
        data: game
    });
});

// =====================================================================
//  Games Routes
// =====================================================================

// POST: /games
app.post("/games", (request, response) =>
{
    const newGame = {
        id: crypto.randomUUID(),
        slug: request.body.slug,
        series: request.body.series,
        release: request.body.release,
        title: request.body.title,
    };

    games.push(newGame);

    response.send({
        status: "OK",
        data: games
    });
});

// GET: /games
app.get("/games", (request, response) =>
{
    let payload = games;
    if (request.query.series != null)
    {
        payload = payload.filter(g => g.series == request.query.series);
    }
    if (request.query.release != null)
    {
        payload = payload.filter(g => g.release == request.query.release);
    }

    response.send({
        status: "OK",
        data: payload
    });
});

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));