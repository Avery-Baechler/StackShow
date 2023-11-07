const scanButton = document.getElementById("scanButton");
//scanButton.disabled = true;
const resultsTable = document.getElementById("resultsTable");
var tools;


function Show(data,table) {

    while (table.rows.length > 1) {
        table.removeChild(table.rows[1]);
    }

    data.forEach(tool => {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    cell.textContent = tool;   
    }) 
}

function handleResponse(message) {
    if (message.name == "tools") {
        tools = message.data;
        console.log(tools); 
    }
    console.log(`Data: ${message}`);
    
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("DOMContentLoaded", function () {
    scanButton.addEventListener("click", function(){
    const sending = browser.runtime.sendMessage({name : "scanPage",});
    sending.then(handleResponse,handleError);
    console.log("scan page button");
    Show(tools,resultsTable);
    });
});

