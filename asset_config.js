/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

const { jsPipeline, sassPipeline } = require('./pipelines');

module.exports = {
    baseDir: __dirname,
    aliasMap: {
        '@js': 'js',
        '@scss': 'scss',
        '@web': 'frontend/web',
        '@yii': 'vendor/yiisoft/yii2',
        '@bower': 'vendor/bower-asset',
        '@views': 'frontend/views',
    },
    outputPath: '@web/build',
    bundles: {
        viewJs: {
            outputName: 'views.min.js',
            pipeline: jsPipeline,
            items: [
                '@views/**/*.js',
            ]
        },
        viewCss: {
            outputName: 'views.min.css',
            pipeline: sassPipeline,
            items: [
                '@views/**/*.scss',
            ]
        },
        appJs: {
            outputName: 'app.min.js',
            pipeline: jsPipeline,
            items: [
                '@js/app.js',
                '@js/views.js',

                // Your app specific JS files will go here.
            ]
        },
        appCss: {
            outputName: 'app.min.css',
            pipeline: sassPipeline,
            items: [
               '@scss/style.scss',
               // Your app specific SASS will go here.
            ]
        },
        vendorJs: {
            outputName: 'vendor.min.js',
            pipeline: jsPipeline,
            items: [

                // yii\web\JqueryAsset
                '@bower/jquery/dist/jquery.js',
                // / yii\web\JqueryAsset
                
                // yii\widgets\PjaxAsset
                '@bower/yii2-pjax/jquery.pjax.js',
                // / yii\widgets\PjaxAsset

                // yii\bootstrap\BootstrapPluginAsset
                '@bower/bootstrap/dist/js/bootstrap.js',
                // / yii\bootstrap\BootstrapPluginAsset
                
                // yii\web\YiiAsset
                '@yii/assets/yii.js',
                // / yii\web\YiiAsset

                // yii\widgets\ActiveFormAsset
                '@yii/assets/yii.activeForm.js',
                // / yii\widgets\ActiveFormAsset

                // yii\grid\GridViewAsset
                '@yii/assets/yii.gridView.js',
                // / yii\grid\GridViewAsset

                // yii\validators\ValidationAsset
                '@yii/assets/yii.validation.js',
                // /yii\validators\ValidationAsset


                // Other vendor specific JS from widgets from your libraries.
            ]
        },
        vendorCss: {
            outputName: 'vendor.min.css',
            pipeline: sassPipeline,
            items: [
                // yii\bootstrap\BootstrapAsset
                '@bower/bootstrap/dist/css/bootstrap.css',
                // / yii\bootstrap\BootstrapAsset



                // Other vendor specific CSS from widgets from your libraries.

            ]
        }
    }
};
