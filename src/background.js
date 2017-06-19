import copy from 'copy-to-clipboard';

chrome.commands.onCommand.addListener(function(command) {
    console.log(command);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { method: command }, (response) => {
            copy(response);
        });
    });
});
