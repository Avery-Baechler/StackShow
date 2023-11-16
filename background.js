async function initializeClassToToolMap() {
  try {
    const dataModule = await import('./toolToKeyDB.js');
    return dataModule.classToToolMap;
  } catch (error) {
    console.error('Error loading data module:', error);
    return null; // Handle the error gracefully
  }
}

initializeClassToToolMap(); 

function getActiveTabDOM() {
  return new Promise((resolve, reject) => {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      const activeTab = tabs[0];
      if (activeTab) {
        browser.tabs.executeScript(activeTab.id, {
          code: 'document.documentElement.outerHTML;'
        }).then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject('No active tab found');
      }
    }).catch(error => {
        reject(error);
    });
  });
}

function scrapeScripts(doc, lowerCaseClassToToolMap, existingTools) {
    const scriptTools = new Map();

    const scriptTags = doc.querySelectorAll('script');
    for (const scriptTag of scriptTags) {
        const src = scriptTag.getAttribute('src');
        if (src) {
            for (const partialClass in lowerCaseClassToToolMap) {
                if (src.toLowerCase().includes(partialClass) && !existingTools.has(partialClass)) {
                    scriptTools.set(partialClass, lowerCaseClassToToolMap[partialClass]);
                    break;
                }
            }
        }
    }
    console.log(scriptTools);
    return scriptTools; 
}

async function scrapePage(html, initializeClassToToolMap) {
    const classToToolMap = await initializeClassToToolMap();

    return new Promise((resolve) => {
        const matchingTools = new Map();
        const lowerCaseClassToToolMap = Object.fromEntries(
            Object.entries(classToToolMap).map(([key, value]) => [key.toLowerCase(), value])
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const elements = doc.querySelectorAll('*');

        for (const element of elements) {
            const classList = Array.from(element.classList);
            for (const className of classList) {
                const lowerClassName = className.toLowerCase();
                for (const partialClass in lowerCaseClassToToolMap) {
                    if (lowerClassName.includes(partialClass)) {
                        matchingTools.set(partialClass, lowerCaseClassToToolMap[partialClass]);
                        break;
                    }
                }
            }
        }

        const scriptTools = scrapeScripts(doc, lowerCaseClassToToolMap, matchingTools);
        scriptTools.forEach((value, key) => matchingTools.set(key, value));

        resolve(Array.from(matchingTools.values()));
    });
}


function handleMessage(message,sendResponse) {
if (message.name === "scanPage") {

    return getActiveTabDOM().then(html => {
 
      return scrapePage(html,initializeClassToToolMap).then(domData => {
        return {name: "tools", data: domData};
      });
    }).catch(error => {

      throw error;
    });
  }
  return Promise.reject('Unrecognized action');
}
browser.runtime.onMessage.addListener(handleMessage);


