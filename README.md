
![Logo](https://github.com/Avery-Baechler/StackShow/blob/main/icons/banner.png?raw=true)

# StackShow
StackShow is a browser extention that reveals if a webpage is using popular tools and frameworks.

[<img alt="alt_text" width="20%" src="https://github.com/Avery-Baechler/StackShow/blob/main/icons/firefox.svg?raw=true" />](https://addons.mozilla.org/en-US/firefox/addon/stackshow/)

## Run Locally

1. ```bash git clone https://github.com/Avery-Baechler/StackShow.git```
2. ```visit <about:debugging#/runtime/this-firefox> ```
3. Press "Load temporary add-on", Select manifest.json


## Overview

menu.js, css, and html are responsible for the popup page. They communicate background.js using [runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage) and background.js does the heavy lifting of scraping the page. background.js uses ```initializeClassToToolMap()``` to pull all the indentifiers from tooToKeyDB.js. When the popup is loaded ```scanPage``` message is sent to backgroundscript and the scanPage() function is called along with other helper functions. The ```tools``` message is given in response and displayed on the table using ```showTable()```



## Roadmap

- Add more tools that can be reconginzed

- Add chrome browser support
