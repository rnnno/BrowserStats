document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        backgroundPage.getDataFromDate(new Date()).then(function (data) {
            displayData(data);
        });
    });
});

function displayData(data) {
    var siteList = document.getElementById('siteList');
    siteList.innerHTML = '';
    console.log(data);

    for (var i = 0; i < Math.min(3, data.length); i++) {
        var listItem = document.createElement('li');
        listItem.textContent = `${data[i].domain}: ${data[i].count} visits`;
        siteList.appendChild(listItem);
    }
}
