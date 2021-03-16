var w = window;
var d = document;
// IE detection from: https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
var isIE11 = !!w.MSInputMethodContext && !!d.documentMode;
if (isIE11) {
    window.addEventListener('resize', function () {
        fixUxGrids(true);
    });
}
// DOM observer from: https://stackoverflow.com/a/14570614/437725
var observeDOM = (function () {
    var MutationObserver = w.MutationObserver || w.WebKitMutationObserver;
    var eventListenerSupported = window.addEventListener;
    return function (obj, callback) {
        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver(function (mutations) {
                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            obs.observe(obj, { childList: true, subtree: true });
        }
        else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();
// Observe a specific DOM element:
observeDOM(document, function () {
    fixUxGrids();
});
function fixUxGrids(force) {
    if (force === void 0) { force = false; }
    var grids = document.getElementsByTagName('ux-grid');
    for (var index = 0; index < grids.length; index++) {
        var grid = grids[index];
        if (grid !== null && grid.classList) {
            if (!force && grid.classList.contains('grid-ie-fixed')) {
                continue;
            }
            fixUxGrid(grid);
            grid.classList.add('grid-ie-fixed');
        }
    }
}
function fixUxGrid(grid) {
    if (!grid.style) {
        return;
    }
    var columnsAttr = grid.getAttribute('columns');
    var nbColumns = (columnsAttr) ? parseInt(columnsAttr, 10) : 12;
    var gridStyle = grid.style;
    gridStyle['display'] = '-ms-grid';
    var gap = '16px';
    // It would be nice here to be able to determine the gap defined
    // by the ux-grid component, but it's difficult because the value
    // of (grid as any).currentStyle['grid-gap'] returns the CSS
    // variable string and not the computed value
    var columns = [];
    for (var k = 0; k < nbColumns; k++) {
        columns.push(nbColumns + "fr");
    }
    gridStyle['-ms-grid-columns'] = columns.join(" " + gap + " ");
    var rows = ['auto'];
    gridStyle['-ms-grid-rows'] = rows.join(" " + gap + " ");
    var count = 1;
    var row = 1;
    var children = grid.children;
    for (var index = 0; index < children.length; index++) {
        var child = children[index];
        if (!child) {
            continue;
        }
        var style = child.currentStyle;
        if (!style) {
            continue;
        }
        var gridColumnStyle = style['grid-column'];
        if (!gridColumnStyle) {
            continue;
        }
        var originalNbColumns = parseInt(gridColumnStyle.replace('span ', ''), 10);
        var ieNbColumns = originalNbColumns + (originalNbColumns - 1);
        if (count + ieNbColumns > nbColumns * 2) {
            rows.push('auto');
            gridStyle['-ms-grid-rows'] = rows.join(" " + gap + " ");
            row += 2;
            count = 1;
        }
        var childStyle = child.style;
        childStyle['-ms-grid-row'] = row;
        childStyle['-ms-grid-column'] = count;
        childStyle['-ms-grid-column-span'] = ieNbColumns;
        count = count + ieNbColumns + 1;
    }
}
