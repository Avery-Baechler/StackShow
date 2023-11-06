var table = document.getElementById("table-results");
var url = window.location.herf;
var domData;
const scanButton = document.getElementById("scanButton")


function Show() {
  //var row = table.insertRow(0);
  //var cell1 = row.insertCell(0);
  //cell1.innerHTML = "NEW CELL1";
}

function handleResponse(message) {
      console.log(`Data: ${message.data}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("DOMContentLoaded", function () {
    scanButton.addEventListener("click", function(){
    const sending = browser.runtime.sendMessage({message : "scanPage",});
    sending.then(handleResponse,handleError);
    console.log("scan page button");
    });
});


