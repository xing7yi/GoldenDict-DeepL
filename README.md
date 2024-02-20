# Node.js Plugin for Utilizing DeepL Translation API in GoldenDict/GoldenDict-ng

This Node.js plugin enables seamless integration of DeepL's translation service into GoldenDict/GoldenDict-ng, a cross-platform open-source dictionary application. GoldenDict/GoldenDict-ng can be used on Windows, macOS, and Linux systems, providing a versatile solution for translation needs.

Since the API for free users comes with monthly usage limits, I've added a feature in the plugin that automatically checks the remaining free usage after each translation request, ensuring you're always aware of your usage.

In developing this plugin, I employed various technical approaches to enhance user experience. Firstly, I used regular expressions to determine if the input content is in Chinese. If it is, the content is translated into English; otherwise, it's translated into Chinese. This makes it effortless to translate Chinese into other languages or vice versa.

Furthermore, to protect sensitive information, I stored DeepL's AUTH_KEY in a separate .env file and imported it into my code as an environment variable using the dotenv package, ensuring security and maintainability.
