const characters = require('./data.json');
const { applyFilters, getEffectiveAge } = require('./src/filters');

function getAllCharacters() {
    return characters;
}

function getCharacterById(id) {
    if (typeof id !== 'number') {
        throw new Error("[Moe-Dex Error] 'id' must be a number.");
    }
    return characters.find(char => char.id === id) || null;
}

function searchCharacters(options = {}) {
    let results = applyFilters(characters, options);

    if (options.sortBy) {
        if (typeof options.sortBy !== 'string') throw new Error("[Moe-Dex Error] 'sortBy' must be a string.");
        
        results.sort((a, b) => {
            let valA = 0, valB = 0;

            if (options.sortBy === 'age') {
                valA = getEffectiveAge(a) || 0;
                valB = getEffectiveAge(b) || 0;
            } else if (options.sortBy === 'height') {
                valA = a.attributes.heightCm || 0;
                valB = b.attributes.heightCm || 0;
            } else if (options.sortBy === 'weight') {
                valA = a.attributes.weightKg || 0;
                valB = b.attributes.weightKg || 0;
            }

            if (options.sortOrder === 'desc') {
                return valB - valA;
            }
            return valA - valB;
        });
    }

    if (options.limit !== undefined) {
        if (typeof options.limit !== 'number') throw new Error("[Moe-Dex Error] 'limit' must be a number.");
        results = results.slice(0, options.limit);
    }

    return results; 
}

function getRandomCharacter(options = {}) {
    const filtered = applyFilters(characters, options);
    
    if (filtered.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    searchCharacters,
    getRandomCharacter
};