MainApp.module.view.handle('index-main-js', function MyView(config) {
    this.find('[data-to-text]').html(config.text + ' but its inserted from Javascript at ' + (new Date()));
});