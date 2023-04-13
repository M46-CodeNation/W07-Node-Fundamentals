const express = require("express");
const { Game } = require("./db");

// Fluent Configuration
const app = express()
    .disable('TRACE')
    .use(express.json());

// =====================================================================
//  COMMANDS
// =====================================================================

// Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

/**
* @typedef {object} GameRequestBody
* @property {string} slug - The game's slug.
* @property {string} genre - The game's genre.
* @property {string} series - The series the game is a part of.
* @property {number} installment - The numbered installment of the game within the series.
* @property {string} title - The game's title.
*/

/**
 * Create a new game.
 *
 * @route POST /games
 * @group Games
 * @param {GameRequestBody.model} game.body.required - The game to create.
 * @returns {Game.model} 201 - The created game.
 * @returns {Error} 500 - Internal server error.
 */
app.post('/games', async (req, res) =>
{
    try
    {
        let result;
        if (Array.isArray(req.body)) {
            result = await Game.insertMany(req.body);
        } else {
            const game = new Game(req.body);
            result = await game.save();
        }
        res.status(201).json({ data: result });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Update a game.
 *
 * @route PUT /games/:id
 * @group Games
 * @param {string} id.path.required - The game's ID.
 * @param {GameRequestBody.model} game.body.required - The updated game.
 * @returns {Game.model} 200 - The updated game.
 * @returns {Error} 404 - Game not found.
 * @returns {Error} 500 - Internal server error.
 */
app.put('/games/:id', async (req, res) =>
{
    const { id } = req.params;
    try
    {
        const game = await Game.findById(id);
        if (!game)
        {
            return res.status(404).json({ message: 'Game not found' });
        }
        game.slug = req.body.slug;
        game.genre = req.body.genre;
        game.series = req.body.series;
        game.release = req.body.release;
        game.title = req.body.title;
        await game.save();
        res.status(200).json({ data: game });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Update a game.
 *
 * @route PATCH /games/:id
 * @group Games
 * @param {string} id.path.required - The game's ID.
 * @param {GameRequestBody.model} game.body.required - The updated game.
 * @returns {Game.model} 200 - The updated game.
 * @returns {Error} 404 - Game not found.
 * @returns {Error} 500 - Internal server error.
 */
app.patch('/games/:id', async (req, res) =>
{
    const { id } = req.params;
    try
    {
        let game = await Game.findById(id);
        if (!game)
        {
            return res.status(404).json({ message: 'Game not found' });
        }
        game.slug = req.body.slug ?? game.slug;
        game.genre = req.body.genre ?? game.genre;
        game.series = req.body.series ?? game.series;
        game.release = req.body.release ?? game.release;
        game.title = req.body.title ?? game.title;
        await game.save();
        res.status(200).json({ data: game });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Delete a game.
 *
 * @route PATCH /games/:id
 * @group Games
 * @param {string} id.path.required - The game's ID.
 * @returns {Error} 404 - Game not found.
 * @returns {Error} 500 - Internal server error.
 */
app.delete('/games/:id', async (req, res) =>
{
    const { id } = req.params;
    try
    {
        let game = await Game.findById(id);
        if (!game)
        {
            return res.status(404).json({ message: 'Game not found' });
        }
        await game.deleteOne();
        res.status(204).end();
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =====================================================================
//  QUERIES
// =====================================================================

/**
 * Get all games within the collection, optionally filtered by genre, series, or release.
 * 
 * @name GET /games
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} Returns a JSON object with all games.
 * @throws {Error} Throws a 500 error if there was an internal server error.
*/
app.get('/games', async (req, res) =>
{
    try
    {
        const { genre, series, release } = req.query;
        let query = {};
        if (genre) query.genre = genre;
        if (series) query.series = series;
        if (release) query.release = release;

        const games = await Game.find(query);
        res.status(200).json({ message: "OK", data: games });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Get a specific game, based on the SEO slug.
 * 
 * @name GET /game
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} Returns a JSON object with the requested game.
 * @throws {Error} Throws a 500 error if there was an internal server error.
*/
app.get('/game/:slug', async (req, res) =>
{
    const { slug } = req.params;
    try
    {
        const games = await Game.find({ slug });
        res.status(200).json({ message: "OK", data: games });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =====================================================================
//  RUN
// =====================================================================

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));

// FOR REFERENCE PURPOSES ONLY.

var referenceJson = [
    {
        "genre": "Point & Click Adenture",
        "slug": "mi1",
        "series": "Monkey Island",
        "release": 1,
        "title": "Monkey Island 1: The Secret of Monkey Island"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "mi2",
        "series": "Monkey Island",
        "release": 2,
        "title": "Monkey Island 2: LeChuck's Revenge"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "mi3",
        "series": "Monkey Island",
        "release": 3,
        "title": "Monkey Island 3: The Curse of Monkey Island"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "mi4",
        "series": "Monkey Island",
        "release": 4,
        "title": "Monkey Island 4: Escape from Monkey Island"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "mi5",
        "series": "Monkey Island",
        "release": 5,
        "title": "Monkey Island 5: Tales of Monkey Island"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "dw1",
        "series": "Discworld",
        "release": 1,
        "title": "Discworld"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "dw2",
        "series": "Discworld",
        "release": 2,
        "title": "Discworld II: Missing, Presumed..."
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "dw3",
        "series": "Discworld",
        "release": 3, title: "Discworld Noir"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "gk1",
        "series": "Gabriel Knight",
        "release": 1,
        "title": "Gabriel Knight 1: Sins of the Father"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "gk2",
        "series": "Gabriel Knight",
        "release": 2,
        "title": "Gabriel Knight 2: The Beast Within"
    },
    {
        "genre": "Point & Click Adenture",
        "slug": "gk3",
        "series": "Gabriel Knight",
        "release": 3,
        "title": "Gabriel Knight 3: Blood of the Sacred, Blood of the Damned"
    }
];