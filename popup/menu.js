var tools;

function switchTheme(scheme) {  
    if (scheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
   window.location.reload();
}


function showTable(data, table) {
    const tbody = table.querySelector('tbody');
  
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (data && data.length > 0) {
       
        data.forEach(tool => {
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            row.className = "new-row"; 
            cell.textContent = tool;
        });
    } else {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        row.className = "new-row"; 
        cell.textContent = 'Couldn\'t find anything';
        cell.colSpan = table.getElementsByTagName('th').length;
    }
}

function handleResponse(message) {
    if (message.name == "tools") {
        tools = message.data;
        showTable(tools,resultsTable);
    }

}

function handleError(error) {
    
    table = resultsTable;
    const tbody = table.querySelector('tbody');
    const row = tbody.insertRow();
    const cell = row.insertCell(0);
    row.className = "new-row"; 
    cell.textContent = 'There was an Error reading this page ';
    cell.colSpan = table.getElementsByTagName('th').length;

    console.log("error");
    console.log(`Error: ${error}`);
}


document.addEventListener("DOMContentLoaded", function () {
    
    const scanButton = document.getElementById("scanButton");
    const resultsTable = document.getElementById("resultsTable");
    const themeButton =  document.querySelector(".themeButton");
    const scheme = window.matchMedia("perfers-color-scheme: dark)");

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
    } else if (currentTheme == "light") {
        document.body.classList.toggle("light-theme");
    }

    const sending = browser.runtime.sendMessage({name : "scanPage",});
        sending.then(handleResponse,handleError);

    scanButton.addEventListener("click", function(){
        const sending = browser.runtime.sendMessage({name : "scanPage",});
        sending.then(handleResponse,handleError);
    });

    themeButton.addEventListener("click", function() {
        console.log("theme"); 
        switchTheme(scheme);
    });

});



