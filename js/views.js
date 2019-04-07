/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

(function ViewHandler(document, window, app) {
    var views = {};

    app.onRun(run);
    app.onRunAjax(run);

    var module = app.module.view = {
        selector: '[data-page-view]',
        idKey: 'pageView',
        handle: handlePage
    };

    function run(config) {
        var pageElements = $(module.selector);

        for(var i = 0; i < pageElements.length; i++) {
            var element = $(pageElements[i]);
            var viewId = element.data(module.idKey);

             if (viewId in views) {
                 var viewConfig = config.modules.view[viewId] || {};
                 views[viewId].call(element, viewConfig, app);
             }
        }
    }

    function handlePage(viewId, callback) {
        if (viewId in views) {
            throw new Error('View ID "' + viewId + '" is already defined!');
        }
        views[viewId] = callback;
    }

})(document, window, MainApp);