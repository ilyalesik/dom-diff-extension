import $ from 'jquery';
var jsdiff = require('diff');
//var Worker = require("worker-loader?name=worker-bundle.js!./worker.js");




let intervalId;
function run() {
    if (intervalId) {
        stop();
        return;
    }
    let prevHtml = $('body').html();
    intervalId = setInterval(()=>{

        let nextHtml = $('body').html();

        if (nextHtml != prevHtml) {
            let diff = jsdiff.diffChars(prevHtml, nextHtml);
            let text = '';
            let colors = [];
            diff.forEach(function(part){
                // green for additions, red for deletions
                // grey for common parts
                var color = part.added ? 'green' :
                    part.removed ? 'red' : 'grey';
                    text += '%c' + part.value;
                    colors.push(`color: ${color}`);

            });
            let result = [text, ...colors];
            console.log(...result);
        }

        prevHtml = nextHtml;
    }, 500);
}

function stop() {
    clearInterval(intervalId);
    intervalId = undefined;
}

let observer;

function startObserver() {
    if (observer) {
        observer.disconnect();
        observer = undefined;
        return;
    }
    var target = document;
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation);
        });
    });

    var config = {subtree: true, attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

function stopObserver() {
    observer.disconnect();
    observer = undefined;
}

let prevHtml = '';

function screenshot() {
    const html = $('body').html();
    var worker = new Worker(chrome.runtime.getURL('dist/worker-bundle.js'));
    //var worker = new Worker();
    worker.postMessage({nextHtml: html, prevHtml});

    prevHtml = html;
    return html;
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method === 'Screenshot') {
            const html = screenshot();
            sendResponse(html);
        }

        if (request.method === 'start') {
            run();
            sendResponse('');
        }

        if (request.method === 'stop') {
            stop();
            sendResponse('');
        }

        if (request.method === 'startObserver') {
            startObserver();
            sendResponse('');
        }

        if (request.method === 'stopObserver') {
            stopObserver();
            sendResponse('');
        }

        return true;
    }
);