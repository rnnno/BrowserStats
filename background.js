chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'getData') {
        // データを取得してポップアップに送信
        getDataFromDate(new Date());
    }
});

// 指定した日付のデータを取得
async function getDataFromDate(date) {
    console.log('in getDataFromDate')
    var startTime = date.setHours(0, 0, 0, 0);
    var endTime = date.setHours(23, 59, 59, 999);

    try {
        const historyItems = await chrome.history.search({ startTime: startTime, endTime: endTime });

        var visitCountMap = new Map();

        historyItems.forEach(function (historyItem) {
            var domain = new URL(historyItem.url).hostname;
            visitCountMap.set(domain, (visitCountMap.get(domain) || 0) + 1);
        });

        var sortedData = [...visitCountMap.entries()].sort((a, b) => b[1] - a[1]);

        console.log(sortedData);

        // データをポップアップに返す
        sendToPopup(sortedData);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
}

// データをポップアップに送信
function sendToPopup(data) {
    chrome.runtime.sendMessage({ type: 'updateData', data: data });
}
