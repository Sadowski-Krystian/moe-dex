// src/filters.js

function getEffectiveAge(char) {
    if (char.attributes.age.chronological !== null) {
        return char.attributes.age.chronological;
    }
    return char.attributes.age.appearance;
}

function applyFilters(characters, options) {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
        return characters;
    }

    
    const numberFilters = ['minAge', 'maxAge', 'minHeight', 'maxHeight', 'minWeight', 'maxWeight'];
    for (const key of numberFilters) {
        if (options[key] !== undefined && typeof options[key] !== 'number') {
            throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' must be a number. Received ${typeof options[key]} instead.`);
        }
    }

    const stringFilters = ['gender', 'species', 'archetype', 'sourceTitle'];
    for (const key of stringFilters) {
        if (options[key] !== undefined && typeof options[key] !== 'string') {
            throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' must be a string. Received ${typeof options[key]} instead.`);
        }
    }

    if (options.traits !== undefined) {
        if (!Array.isArray(options.traits)) {
            throw new Error(`[Moe-Dex Error] Invalid filter type: 'traits' must be an array of strings.`);
        }
        for (const trait of options.traits) {
            if (typeof trait !== 'string') {
                throw new Error(`[Moe-Dex Error] Invalid filter type: Every item in 'traits' array must be a string.`);
            }
        }
    }

    return characters.filter(char => {
        
        if (!options.includeNSFWSource && !char.metadata.isSourceSafe) return false;

        if (options.traits && options.traits.length > 0) {
            const hasAllTraits = options.traits.every(trait => char.attributes.traits.includes(trait));
            if (!hasAllTraits) return false;
        }

        const charAge = getEffectiveAge(char);
        if (options.minAge !== undefined && (charAge === null || charAge < options.minAge)) return false;
        if (options.maxAge !== undefined && (charAge === null || charAge > options.maxAge)) return false;

        const charHeight = char.attributes.heightCm;
        if (options.minHeight !== undefined && (charHeight === null || charHeight < options.minHeight)) return false;
        if (options.maxHeight !== undefined && (charHeight === null || charHeight > options.maxHeight)) return false;

        const charWeight = char.attributes.weightKg;
        if (options.minWeight !== undefined && (charWeight === null || charWeight < options.minWeight)) return false;
        if (options.maxWeight !== undefined && (charWeight === null || charWeight > options.maxWeight)) return false;

        if (options.gender !== undefined && char.attributes.gender.toLowerCase() !== options.gender.toLowerCase()) return false;

        if (options.species !== undefined && char.attributes.species.toLowerCase() !== options.species.toLowerCase()) return false;

        if (options.archetype !== undefined && char.attributes.archetype.toLowerCase() !== options.archetype.toLowerCase()) return false;

        if (options.sourceTitle !== undefined) {
            const searchStr = options.sourceTitle.toLowerCase();
            const matchEng = char.source.titleEng.toLowerCase().includes(searchStr);
            const matchRomaji = char.source.titleRomaji.toLowerCase().includes(searchStr);
            const matchJp = char.source.titleJp.toLowerCase().includes(searchStr);
            
            if (!matchEng && !matchRomaji && !matchJp) return false;
        }

        return true; 
    });
}

module.exports = {
    applyFilters,
    getEffectiveAge
};