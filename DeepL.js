const axios = require("axios");
require("dotenv").config({path: __dirname + "/.env"});

if (!process.env.DEEPL_AUTH_KEY) {
  console.error("Please set DEEPL_AUTH_KEY in .env file");
  process.exit(1);
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

  Promise.all([axios.request(translate_req), axios.request(usage_req)])
    .then(([translate_res, usage_res]) => {
      const translate_data = translate_res.data.translations[0];
      const detected_source_language = translate_data.detected_source_language;
      const text = translate_data.text;
      const character_count = usage_res.data.character_count;
      const character_limit = usage_res.data.character_limit;
      console.log(`
        <div style="color: #a0806d; background-color: #f8f4ef; text-align: justify; padding: 5px;">
          ${input}
          <div style="color:rgb(0, 0, 0); font-family: "PingFang SC"; margin-top: 5px;">
            ${text}
          </div>
        </div>
      `);
      console.log(`
        <div style="text-align: end;padding: 5px 5px 0;">Usage: ${character_count}/${character_limit}</div>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
}
