const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config({path: __dirname + "/.env"});

if (!process.env.DEEPL_AUTH_KEY) {
  console.error("Please set DEEPL_AUTH_KEY in .env file");
  process.exit(1);
}

// Cache configuration
const CACHE_FILE = path.join(__dirname, "translation_cache.json");
const CACHE_EXPIRY_DAYS = 30; // Cache expires after 30 days

// Load cache from file
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
      // Clean expired entries
      const now = Date.now();
      const validCache = {};
      for (const [key, value] of Object.entries(cacheData)) {
        if (now - value.timestamp < CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
          validCache[key] = value;
        }
      }
      return validCache;
    }
  } catch (error) {
    console.error("Error loading cache:", error.message);
  }
  return {};
}

// Save cache to file
function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error("Error saving cache:", error.message);
  }
}

// Generate cache key
function getCacheKey(text, targetLang) {
  return `${text.trim().toLowerCase()}_${targetLang}`;
}

// Output translation result with usage info
function outputResult(input, translation, usageInfo = null) {
  console.log(`
        <div style="color: #a0806d; background-color: #f8f4ef; text-align: justify; padding: 5px;">
          ${input}
          <div style="color:rgb(0, 0, 0); margin-top: 5px;">
            ${translation}
          </div>
        </div>
      `);
  if (usageInfo) {
    console.log(`
        <div style="text-align: end;padding: 5px 5px 0;">Usage: ${usageInfo}</div>
      `);
  }
}


// Get command line arguments
const arg = process.argv.slice(2)[0]; // The real command line arguments start from the third element

// Use regular expression to match Chinese characters
const isChinese = /[\u4e00-\u9fa5]/.test(arg);

const input = arg.trim();

if (isChinese || input.split(" ").length > 1) {
  const target_lang = isChinese ? "EN-US" : "ZH";

  const data = JSON.stringify({
    text: [input],
    target_lang: target_lang,
  });

  const translate_req = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-free.deepl.com/v2/translate",
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const usage_req = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-free.deepl.com/v2/usage",
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}`,
    },
  };

  // Check if translation exists in cache
  const cache = loadCache();
  const cacheKey = getCacheKey(input, target_lang);

  if (cache[cacheKey]) {
    const cachedResult = cache[cacheKey];
    outputResult(input, cachedResult.translation);
    return;
  }

  Promise.all([axios.request(translate_req), axios.request(usage_req)])
    .then(([translate_res, usage_res]) => {
      const translate_data = translate_res.data.translations[0];
      const detected_source_language = translate_data.detected_source_language;
        const text = translate_data.text;
        const character_count = usage_res.data.character_count;
        const character_limit = usage_res.data.character_limit;
        const usageInfo = `${character_count}/${character_limit}`;
        // Save to cache
        cache[cacheKey] = {
          translation: text,
          timestamp: Date.now(),
          sourceLanguage: detected_source_language
        };
        saveCache(cache);
        outputResult(input, text, usageInfo);
      }).catch((error) => {
      console.log(`
        <div style="color: #dc3545; background-color: #f8d7da; padding: 10px; border-radius: 5px;">
          <strong>Translation Error:</strong> ${error.message}
        </div>
      `);
    });


}
