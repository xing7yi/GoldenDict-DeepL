const axios = require("axios");
require("dotenv").config({path: __dirname + "/.env"});

// 获取命令行参数
const arg = process.argv.slice(2)[0]; // 从第三个元素开始是真正的命令行参数

// 使用正则表达式匹配中文字符
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
      console.log(
        `[${detected_source_language}] ${input} <hr> [${target_lang}] ${text}`
      );
      console.log(`
        <div style="text-align: end;padding: 5px 5px 0;">Usage: ${character_count}/${character_limit}</div>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
}
