var jsdiff = require('diff');
var beautify_html = require('js-beautify').html;

module.exports = function worker (self) {
    self.addEventListener('message', (event) => {
        let {nextHtml, prevHtml} = event.data;
        nextHtml = beautify_html(nextHtml);
        prevHtml = beautify_html(prevHtml);
        let diff = jsdiff.diffLines(prevHtml, nextHtml);
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
        console.log('-----------------------------------------');
        console.log(...result);
    });
};
