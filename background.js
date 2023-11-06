var html;





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
}

function scrapePage(data) {

    const domData = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(domData, 'text/html');

    const className = 'parent'; 

    const elements = doc.querySelectorAll(`.${className}`);

    const elementList = Array.from(elements);

    console.log(elementList);
}




function handleMessage(message,sendResponse) {
    getActiveTabDOM()
    console.log(html);
    scrapePage(html);
    return Promise.resolve({data:"test"})
}

browser.runtime.onMessage.addListener(handleMessage);


