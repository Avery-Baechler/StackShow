var tools;


document.addEventListener("DOMContentLoaded", function () {
 
}); 

function showTable(data, table) {
    const tbody = table.querySelector('tbody');
  
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (data && data.length > 0) {
       
        data.forEach(tool => {
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = tool;
        });
    } else {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = 'Couldn\'t find anything';
        cell.colSpan = table.getElementsByTagName('th').length;
    }
}


function resetTable(table) {
  const tbody = table.querySelector('tbody');

  while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
  }
  const row = tbody.insertRow();
  const cell = row.insertCell(0);
  cell.textContent = 'No data available';
  cell.colSpan = table.getElementsByTagName('th').length;
}


function handleResponse(message) {
    if (message.name == "tools") {
        tools = message.data;
        showTable(tools,resultsTable);
    }
    console.log(`Data: ${message}`);
    
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("DOMContentLoaded", function () {
    
    const scanButton = document.getElementById("scanButton");
    const resetButton = document.getElementById("resetButton");
    const resultsTable = document.getElementById("resultsTable");

    scanButton.addEventListener("click", function(){
        const sending = browser.runtime.sendMessage({name : "scanPage",});
        sending.then(handleResponse,handleError);
    });

    resetButton.addEventListener("click", function(){
        resetTable(resultsTable);
    });



});

