var html = "";


//https://www.bairesdev.com/blog/top-development-frameworks/
//and gpt for the database


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


(async () => {
  try {
    const dataModule = await import('./data.js');
    const classToToolMap = dataModule.classToToolMap;
    // Now you can use classToToolMap in your logic
  } catch (error) {
    console.error('Error loading data module:', error);
  }
})();


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


