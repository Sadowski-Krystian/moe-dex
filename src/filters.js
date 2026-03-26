// src/filters.js

function getEffectiveAge(char) {
    if (char.attributes.age.chronological !== null) {
        return char.attributes.age.chronological;
    }
    return char.attributes.age.appearance;
}

function matchStringOrArray(charValue, filterValue, exactMatch = true) {
    if (!charValue) return false;
    const cVal = charValue.toLowerCase();
    
    if (Array.isArray(filterValue)) {
        if (exactMatch) return filterValue.some(v => cVal === v.toLowerCase());
        return filterValue.some(v => cVal.includes(v.toLowerCase()));
    } else {
        if (exactMatch) return cVal === filterValue.toLowerCase();
        return cVal.includes(filterValue.toLowerCase());
    }
}

function applyFilters(characters, options) {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
        return characters;
    }

    
    const numberFilters = ['minAge', 'maxAge', 'minHeight', 'maxHeight', 'minWeight', 'maxWeight'];
    for (const key of numberFilters) {
        if (options[key] !== undefined && typeof options[key] !== 'number') {
            throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' must be a number.`);
        }
    }

    const stringOrArrayFilters = ['gender', 'species', 'excludeSpecies', 'archetype', 'sourceTitle', 'name', 'build', 'excludeBuild'];
    for (const key of stringOrArrayFilters) {
        if (options[key] !== undefined) {
            if (typeof options[key] === 'string') {
                // Jest ok
            } else if (Array.isArray(options[key])) {
                for (const item of options[key]) {
                    if (typeof item !== 'string') throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' array must contain only strings.`);
                }
            } else {
                throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' must be a string or an array of strings.`);
            }
        }
    }

    const traitFilters = ['traits', 'excludeTraits'];
    for (const key of traitFilters) {
        if (options[key] !== undefined) {
            if (!Array.isArray(options[key])) throw new Error(`[Moe-Dex Error] Invalid filter type: '${key}' must be an array of strings.`);
            for (const trait of options[key]) {
                if (typeof trait !== 'string') throw new Error(`[Moe-Dex Error] Invalid filter type: Every item in '${key}' must be a string.`);
            }
        }
    }

    return characters.filter(char => {
        
        if (!options.includeNSFWSource && !char.metadata.isSourceSafe) return false;

        if (options.traits && options.traits.length > 0) {
            const hasAllTraits = options.traits.every(trait => char.attributes.traits.includes(trait));
            if (!hasAllTraits) return false;
        }

        if (options.excludeTraits && options.excludeTraits.length > 0) {
            const hasExcludedTrait = options.excludeTraits.some(trait => char.attributes.traits.includes(trait));
            if (hasExcludedTrait) return false;
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

        if (options.gender !== undefined && !matchStringOrArray(char.attributes.gender, options.gender)) return false;
        if (options.species !== undefined && !matchStringOrArray(char.attributes.species, options.species)) return false;
        if (options.excludeSpecies !== undefined && matchStringOrArray(char.attributes.species, options.excludeSpecies)) return false;
        if (options.archetype !== undefined && !matchStringOrArray(char.attributes.archetype, options.archetype)) return false;
        
        if (options.name !== undefined && !matchStringOrArray(char.name, options.name, false)) return false;

        if (options.sourceTitle !== undefined) {
            const matchEng = matchStringOrArray(char.source.titleEng, options.sourceTitle, false);
            const matchRomaji = matchStringOrArray(char.source.titleRomaji, options.sourceTitle, false);
            const matchJp = matchStringOrArray(char.source.titleJp, options.sourceTitle, false);
            if (!matchEng && !matchRomaji && !matchJp) return false;
        }
        if (options.anyTraits && options.anyTraits.length > 0) {
            const hasAnyTrait = options.anyTraits.some(trait => char.attributes.traits.includes(trait));
            if (!hasAnyTrait) return false;
        }
        if (options.build !== undefined && !matchStringOrArray(char.attributes.build, options.build)) return false;
        if (options.excludeBuild !== undefined && matchStringOrArray(char.attributes.build, options.excludeBuild)) return false;

        return true; 
    });
}

module.exports = { applyFilters, getEffectiveAge };