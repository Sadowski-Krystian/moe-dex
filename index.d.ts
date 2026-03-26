// index.d.ts

export interface CharacterSource {
    titleEng: string;
    titleRomaji: string;
    titleJp: string;
    malUrl?: string;
}

export interface CharacterAge {
    chronological: number | null;
    appearance: number | null;
    isEstimated: boolean;
    display: string;
}

export interface CharacterAttributes {
    age: CharacterAge;
    heightCm: number | null;
    weightKg: number | null;
    gender: string;
    species: string;
    build?: string;
    archetype: string;
    traits: string[];
}

export interface CharacterMetadata {
    isSourceSafe: boolean;
    warningTags: string[];
}

export interface Character {
    id: number;
    name: string;
    images: {
        default: string;
        [key: string]: string; 
    };
    source: CharacterSource;
    attributes: CharacterAttributes;
    trivia: string[];
    metadata: CharacterMetadata;
}

export interface SearchOptions {
    // Filtry liczbowe
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
    
    gender?: string | string[];
    species?: string | string[];
    excludeSpecies?: string | string[];
    archetype?: string | string[];
    sourceTitle?: string | string[];
    name?: string | string[];

    traits?: string[];
    excludeTraits?: string[];
    anyTraits?: string[];

    build?: string | string[];
    excludeBuild?: string | string[];

    includeNSFWSource?: boolean;

    sortBy?: 'age' | 'height' | 'weight';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface SearchResult {
    totalCount: number;
    returnedCount: number;
    data: Character[];
}

export declare function getAllCharacters(): Character[];
export declare function getCharacterById(id: number): Character | null;
export declare function searchCharacters(options?: SearchOptions): SearchResult;
export declare function getRandomCharacter(options?: SearchOptions): Character | null;

export declare function getAvailableTraits(): string[];
export declare function getAvailableSpecies(): string[];