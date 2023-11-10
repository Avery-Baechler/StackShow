var html;

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
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    if (activeTab) {
      browser.tabs.executeScript({
        code: 'document.documentElement.outerHTML'
      }).then(result => {
          html = result;
          //console.log(html) 
      }); 
    }
  });
    return html;
}

function scrapePage(data,classToToolMap) {
const matchingTools = new Map();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements = doc.querySelectorAll('*');

  elements.forEach(element => {
    const classList = Array.from(element.classList);

     for (const className of classList) {
      for (const partialClass in classToToolMap) {
        if (className.toLowerCase().includes(partialClass.toLowerCase())) {
          matchingTools.set(classToToolMap[partialClass]);
          break; // Once a partial match is found, break the loop
        }
      }
    }
  });

  return Array.from(matchingTools.keys());
}



function handleMessage(message,sendResponse) {
    html = getActiveTabDOM(); 
    console.log(html);
    domData = scrapePage(html,classToToolMap);
    return Promise.resolve({name:"tools", data: domData})
}

browser.runtime.onMessage.addListener(handleMessage);


