import $ from 'jquery';
var jsdiff = require('diff');

import work from 'webworkify-webpack';
let w = work(require.resolve('./worker.js'));

let prevHtml = '';

function screenshot() {
    const html = $('body').html();
    w.postMessage({nextHtml: html, prevHtml});

    prevHtml = html;
    return html;
}

function screenshotPrepare() {
    prevHtml = $('body').html();
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method === 'Screenshot') {
            const html = screenshot();
            sendResponse(html);
        }

        if (request.method === 'ScreenshotPrepare') {
            screenshotPrepare();
            sendResponse('');
        }

        return true;
    }
);