/* eslint-disable */
var cavealoading = {
    css: false,
    js: false
};
var iCount = setInterval(function () {
    var root = document.getElementById('root');
    if (root.style.display !== 'none') {
        root.style.display = 'none';
    }
    if (cavealoading.js && cavealoading.css) {
        setTimeout(() => {
            var deleteN = document.getElementsByTagName('body');
            var elementsByTagName = document.getElementsByTagName('canvas');
            deleteN[0].removeChild(elementsByTagName[0]);
            animationsetup = null;
            animationresize = null;
            draw = null;
            root.style.display = 'block';
            clearInterval(iCount);
        }, 5500);
    }
});
function LoadingScript(script) {
    loadjs(script, 'foobar', {
        success: function () {
            cavealoading.js = true;
        },
        error: function (pathsNotFound) {

        }
    });
}
function LoadingSheet(script) {
    var load = [];
    for (var i = 0; i < script.length; i++) {
        var loading = loadCSS(script[i]);
        onloadCSS(loading, function () {
            load.push(true);
            if (load.length === script.length) {
                cavealoading.css = true;
            }
        });
    }
}
