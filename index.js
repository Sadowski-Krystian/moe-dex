// Load the local JSON database
const characters = require('./data.json');

/**
 * Returns the entire array of characters.
 * @returns {Array} Array of character objects.
 */
function getAllCharacters() {
  return characters;
}

/**
 * Returns a random character based on provided options.
 * By default, it only returns characters from Safe For Work (SFW) sources.
 * * @param {Object} options - Filtering options.
 * @param {boolean} [options.includeNSFWSource=false] - Set to true to include characters from Ecchi/NSFW anime.
 * @param {Array<string>} [options.traits] - Array of required traits (e.g., ['fox-ears', 'smol']).
 * @returns {Object|null} A character object, or null if no match is found.
 */
function getRandomCharacter(options = {}) {
  let filteredChars = characters;


  if (!options.includeNSFWSource) {
    filteredChars = filteredChars.filter(char => char.metadata.isSourceSafe === true);
  }

  if (options.traits && Array.isArray(options.traits)) {
    filteredChars = filteredChars.filter(char => {

      return options.traits.every(trait => char.attributes.traits.includes(trait));
    });
  }


  if (filteredChars.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredChars.length);
  return filteredChars[randomIndex];
}


module.exports = {
  getAllCharacters,
  getRandomCharacter
};