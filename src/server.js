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
router.post('/games', async (req, res) =>
{
    try
    {
        const game = new Game(req.body);
        const savedGame = await game.save();
        res.status(201).json({ data: savedGame });
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
router.put('/games/:id', async (req, res) =>
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
router.patch('/games/:id', async (req, res) =>
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
router.delete('/games/:id', async (req, res) =>
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

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));