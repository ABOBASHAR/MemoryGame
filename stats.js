document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    displayAllResults();
});

function displayAllResults() {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    let resultTable = document.getElementById('all-results-table').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = ''; // Clear the table before adding new rows
    results.forEach(result => {
        let newRow = resultTable.insertRow();
        newRow.insertCell(0).innerText = result.player;
        newRow.insertCell(1).innerText = result.successes;
        newRow.insertCell(2).innerText = result.failures;
        newRow.insertCell(3).innerText = result.date;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    displayAllResults();
});


function clearStatistics() {
    localStorage.removeItem('results');
    displayAllResults(); // Refresh the display
}
