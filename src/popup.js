import $ from 'jquery'

let isStarted = false;

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

});