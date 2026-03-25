# 🌸 moe-dex

A lightweight, wholesome database and utility engine for fetching adorable (moe/smol) anime characters. Perfect for Discord bots, Gacha mechanics, or "Moedle" guessing games.

## ✨ Features
- 📦 **Zero dependencies:** Extremely lightweight.
- 🛡️ **SFW by default:** Filters out characters from NSFW/Ecchi sources unless explicitly requested.
- 🔍 **Tag-based search:** Easily find characters based on specific traits (e.g., `fox-ears`, `smol`, `kuudere`).

## 🚀 Installation

`npm install moe-dex`

## 💻 Usage

```javascript
const moedex = require('moe-dex');

// Get a random wholesome character
const randomChar = moedex.getRandomCharacter();
console.log(randomChar.name); 

// Find a specific type of character
const foxGirl = moedex.getRandomCharacter({ 
    traits: ['fox-ears', 'miko'] 
});
console.log(`You rolled: ${foxGirl.name} from ${foxGirl.anime}`);

// Want to include characters from spicier sources? (e.g., High School DxD)
const anyChar = moedex.getRandomCharacter({ includeNSFWSource: true });