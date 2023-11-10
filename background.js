var html = "";

const classToToolMap = {
  "wordpress": "WordPress",
  "wp-": "WordPress",   
  "wix-": "Wix",         
  "shopify": "Shopify",
  "squarespace": "Squarespace",
  "weebly": "Weebly",
  "joomla": "Joomla",
  "webflow": "Webflow",
  "bootstrap": "Bootstrap",
  "elementor": "Elementor",
  "divi-": "Divi",        
  "godaddy": "GoDaddy",
  "w3-": "W3Schools",  
  "w3c": "W3C",
  "w3schools": "W3Schools",
  "w3school": "W3Schools", 
  "w3css": "W3CSS",
  "adobe-": "Adobe",  
  "adobe": "Adobe",
  "adobe-": "Adobe",
  "adobe": "Adobe",
  "react-": "React", 
  "vue-": "Vue.js",         
  "angular-": "Angular",    

};



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


function scrapePage(html, classToToolMap) {
  return new Promise((resolve) => {
    const matchingTools = new Map();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.querySelectorAll('*');

    elements.forEach(element => {
      const classList = Array.from(element.classList);

      for (const className of classList) {
        for (const partialClass in classToToolMap) {
          if (className.toLowerCase().includes(partialClass.toLowerCase())) {
            matchingTools.set(partialClass, classToToolMap[partialClass]);
            break;
          }
        }
      }
    });

    resolve(Array.from(matchingTools.values()));
  });
}


function handleMessage(message,sendResponse) {
if (message.name === "scanPage") {

    return getActiveTabDOM().then(html => {
 
      return scrapePage(html,classToToolMap).then(domData => {
        return {name: "tools", data: domData};
      });
    }).catch(error => {

      throw error;
    });
  }
  return Promise.reject('Unrecognized action');
}
browser.runtime.onMessage.addListener(handleMessage);


