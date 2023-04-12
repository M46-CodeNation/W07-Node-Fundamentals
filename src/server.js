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

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));