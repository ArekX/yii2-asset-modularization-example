<?php

namespace frontend\assets;

use common\helpers\JsHelper;
use Yii;
use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class CompiledAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    public $css = [
        'build/vendor.min.css',
        'build/app.min.css',
        'build/views.min.css'
    ];

    public $js =  [
        'build/vendor.min.js',
        'build/app.min.js',
        'build/views.min.js'
    ];

    public function init()
    {
        parent::init();

        if (Yii::$app->request->isAjax || Yii::$app->request->isPjax) {
            $this->js = [];
            $this->css = [];
            return;
        }
    }

    public $depends = [];
}