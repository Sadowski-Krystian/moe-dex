// index.js

const characters = require('./data.json');
const { applyFilters } = require('./src/filters');

/**
 * @param {Object} options - Filters options (np. minAge, traits)
 */
function getRandomCharacter(options = {}) {
    const filteredChars = applyFilters(characters, options);

    if (filteredChars.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredChars.length);
    return filteredChars[randomIndex];
}

function getAllCharacters() {
    return characters;
}

module.exports = {
    getRandomCharacter,
    getAllCharacters
};