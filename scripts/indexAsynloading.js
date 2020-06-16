/* eslint-disable */

var cavealoading = {
    css: false,
    js: false
};

//asyncLoad('link', '/static/css/main.d5c8be1b.css');
//asyncLoad('script', script);
function asyncLoad(V_tag, V_src) {
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
}

function AnimationLoading(script) {
    var iCount = setInterval(function () {
        if (cavealoading.js) {
            var deleteN = document.getElementsByTagName('body');
            deleteN[0].removeChild(document.getElementsByTagName('canvas')[0]);
            animationsetup = null;
            animationresize = null;
            draw = null;
            clearInterval(iCount);
        }
    }, 3500);
    loadjs(script, 'foobar', {
        success: function () {
            cavealoading.js = true;
        },
        error: function (pathsNotFound) {
            alert('网络异常');
        }
    });
}
