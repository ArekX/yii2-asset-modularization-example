/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

var MainApp = (function() {
    var onRun = [];
    var onRunAjax = [];

    var module = {
        module: {},
        config: {},
        lastAjaxConfig: {},
        onRun: registerOnRun,
        onRunAjax: registerOnRunAjax,
        run: runMainApp,
        runAjax: runMainAppAjax
    };

    return module;

    function registerOnRun(callable) {
        onRun.push(callable);
    }

    function registerOnRunAjax(callable) {
        onRunAjax.push(callable);
    }

    function runMainApp(config) {
        module.config = config;
        for(var i = 0; i < onRun.length; i++) {
            onRun[i](config);
        }
    }  

    function runMainAppAjax(config) {
        module.lastAjaxConfig = config;
        for(var i = 0; i < onRunAjax.length; i++) {
            onRunAjax[i](config);
        }
    }     
})();