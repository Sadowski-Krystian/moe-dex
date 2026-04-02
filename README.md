# 🦊 Moe-Dex

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Moe-Dex** is a powerful, fully-typed, and bulletproof Node.js library dedicated specifically to **MOE anime characters**. It provides high-quality data and advanced filtering for characters that embody "moe" aesthetics—focusing on traits like cuteness, fluffiness, and endearing personalities. Built for Discord bot developers, Gacha games, and anime database enthusiasts.

Characters are curated based on specific **Moe Criteria**: visual design (e.g., animal ears, miko outfits), personality archetypes (e.g., caring, clumsy), and overall "softness" of the source material.

## ✨ Features

* 🛡️ **Bulletproof Validation:** Built with a *Fail-Fast* approach. If you pass invalid data, it throws a clear error immediately.
* 🔍 **Advanced Filtering:** Supports `AND`, `OR`, and `NOT` logic. Search by traits, age, height, species, and much more.
* 📊 **Built-in Pagination:** Returns exact search metadata (total count, returned count), making it perfect for UI and Discord pagination buttons.
* 📦 **TypeScript Ready:** Full autocomplete and type definitions (IntelliSense) right out of the box.

---

## 🚀 Installation

```bash
npm install moe-dex
```

---

## 📖 Quick Start

### Random Character
Perfect for a `/waifu` or `/husbando` command in your bot.

```javascript
const moedex = require('moe-dex');

// Get a random character that is either a Kitsune or a Dragon
const randomChar = moedex.getRandomCharacter({
    species: ["Kitsune", "Dragon"]
});

if (randomChar) {
    console.log(`Rolled: ${randomChar.name} from ${randomChar.source.titleEng}`);
}
```

---

## 🛠️ Advanced Search (API Reference)

The `searchCharacters` function is the core of this library. It returns a metadata object alongside the data, which makes building web pages or Discord UI buttons incredibly easy.

### Example: Complex Filters & Pagination

```javascript
const moedex = require('moe-dex');

const results = moedex.searchCharacters({
    // 1. OR Logic (Arrays): Search for Kitsune OR Elves
    species: ["Kitsune", "Elf"],
    
    // 2. NOT Logic (Exclusions): Reject characters under 18
    minAge: 18,
    excludeTraits: ["mecha"],
    
    // 3. AND Logic (Requirements): Must have the "fluffy" trait
    traits: ["fluffy"],
    
    // 4. Sorting & Pagination
    sortBy: "age",
    sortOrder: "desc",
    limit: 5,     // Get a maximum of 5 results per page
    offset: 0     // Skip 0 characters (Page 1)
});

console.log(`Total characters matching criteria: ${results.totalCount}`);
console.log(`Characters returned on this page: ${results.returnedCount}`);

results.data.forEach(char => {
    console.log(`- ${char.name} (Age: ${char.attributes.age.display})`);
});
```

### Available Filtering Options (`SearchOptions`)

| Parameter | Type | Description |
|---|---|---|
| `name` | `string \| string[]` | Character name (partial match supported) |
| `species` | `string \| string[]` | Species (e.g., "Kitsune", "Human") |
| `excludeSpecies` | `string \| string[]` | Species to exclude from results |
| `build` | `string \| string[]` | Body type (e.g., "smol", "chibi") |
| `excludeBuild` | `string \| string[]` | Body types to exclude (NOT) |
| `traits` | `string[]` | Traits the character **must** have (AND logic) |
| `anyTraits` | `string[]` | Traits the character must have **at least one** of (OR logic) |
| `excludeTraits`| `string[]` | Traits to exclude (NOT logic) |
| `minAge` / `maxAge` | `number` | Filter by effective age |
| `limit` | `number` | Max amount of characters to return (Pagination) |
| `offset` | `number` | Amount of characters to skip (Pagination) |

*(For a full list of parameters, check the TypeScript definitions included in the package).*

---

## 🧰 Helper Functions

If you are building a dropdown menu or dynamic slash command options, these functions will return an alphabetical array of all available options currently in the database:

```javascript
const allTraits = moedex.getAvailableTraits();
const allSpecies = moedex.getAvailableSpecies();

console.log("You can filter by the following species:", allSpecies.join(", "));
```

---

## 🌸 Contributing & The "Moe-Dex" Score System

To maintain the highest data quality, every character added to **Moe-Dex** must pass our official **Moe Checklist**. A character needs at least **3 out of 6 points** to be included in the database.

### The Moe Scoring Criteria:

1. **Protective Instinct (2 Points - Primary Criterion):** Does the character trigger a natural urge to protect, hug, or feed them? They must appear innocent, pure, or "must-protect" (e.g., Kanna Kamui’s childlike innocence despite being a dragon).
2. **Visual "Smol/Cute" Attributes (1 Point):** Does the character have physical traits like animal ears (kemonomimi), oversized clothing, a small stature for their age, or a signature *ahoge*?
3. **Endearing Personality Flaws (1 Point):** Perfect characters are not Moe. Does the character have a cute weakness? (e.g., being a *Dojikko*/clumsy, extreme shyness, or an adorable obsession with sweets/games).
4. **Verbal Tics & Mannerisms (1 Point):** Does the character have a unique way of speaking? (e.g., ending sentences with "desu" or "nya", or referring to themselves in the third person).
5. **Aura of Softness (1 Point):** Does the character belong to a "healing" (*Iyashikei*) or light-hearted source material where the overall vibe is cozy and "soft"?
6. **Community Consensus (1 Point - The Lifeline):** Is the character universally labeled as "Moe", "Kawaii", or "Must Protect" by the anime community (MAL, Reddit, TV Tropes)?

### How to contribute:
1. **Calculate the Score:** Ensure your character hits at least **3/6 points**.
2. **Fork & Add:** Update `data.json` with the character's stats, traits, and images.
3. **Submit PR:** In your Pull Request, briefly mention why the character passed the Moe Checklist.

*Note: Characters with 0-2 points will be rejected to keep the Dex pure.*

*Note: Packet will be publishet after database have over 50/100 characters.*