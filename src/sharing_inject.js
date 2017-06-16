import $ from 'jquery'
import jsdiff from 'diff';

let intervalId;
function run() {
    let prevHtml = $('body').html();
    intervalId = setInterval(()=>{
        let nextHtml = $('body').html();

        if (nextHtml !== prevHtml) {
            let diff = jsdiff.diffChars(prevHtml, nextHtml);
            console.log(diff);
        }

        prevHtml = nextHtml;
    }, 100);
}

function stop() {
    clearInterval(intervalId);
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method === 'start') {
            run();
            sendResponse('');
        }

        if (request.method === 'stop') {
            stop();
            sendResponse('');
        }

        return true;
    }
);