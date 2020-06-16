/* eslint-disable */

var cavealoading = {
    css: false,
    js: false
};

//asyncLoad('link', '/static/css/main.d5c8be1b.css');
//asyncLoad('script', script);
/*function asyncLoad(V_tag, V_src) {
    if (V_tag == 'script') {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = V_src;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.onload = function () {
            cavealoading.js = true;
        };
    } else {
        var s = document.createElement('link');
        s.async = true;
        s.rel = 'stylesheet';
        s.href = V_src;
        var x = document.getElementsByTagName('link')[0];
        x.parentNode.insertBefore(s, x);
        s.onload = function () {
            cavealoading.css = true;
        };
    }
}*/

var iCount = setInterval(function () {
    if (cavealoading.js && cavealoading.css) {
        var deleteN = document.getElementsByTagName('body');
        deleteN[0].removeChild(document.getElementsByTagName('canvas')[0]);
        animationsetup = null;
        animationresize = null;
        draw = null;
        clearInterval(iCount);
    }
}, 3500);

function LoadingScript(script) {
    loadjs(script, 'foobar', {
        success: function () {
            cavealoading.js = true;
        },
        error: function (pathsNotFound) {
            alert('脚本加载失败！网络异常');
        }
    });
}

function LoadingSheet(script) {
    var load = [];
    for (var i = 0; i < script.length; i++) {
        var loading = loadCSS(script[i]);
        onloadCSS(loading, function () {
            load.push(true);
        });
    }
    var alltrue = true;
    if (load.length === script.length) {
        for (var i = 0; i < load.length; i++) {
            if (!load[i]) {
                alltrue = false;
            }
        }
    } else {
        alltrue = false;
    }
    if (alltrue) {
        cavealoading.js = true;
    } else {
        alert('样式加载失败！网络异常');
    }
}
