import $ from 'jquery'

let isStarted = false;
let isStartedObserver = false;

$(document).ready(function(){
    $('#record-button').click(function(e){
        $('#record-button').text(isStarted ? 'Записать' : 'Остановить');
        isStarted = !isStarted;
        chrome.tabs.query({active:true}, function(tabs){

            chrome.tabs.sendMessage(tabs[0].id, { method: isStarted ? 'start' : 'stop' }, (share) => {
                console.log(share);
            });
        });
    });

    $('#observer-button').click(function(e){
        $('#observer-button').text(isStarted ? 'Observer' : 'Остановить');
        isStarted = !isStarted;
        chrome.tabs.query({active:true}, function(tabs){

            chrome.tabs.sendMessage(tabs[0].id, { method: isStarted ? 'startObserver' : 'stopObserver' }, (share) => {
                console.log(share);
            });
        });
    });

});