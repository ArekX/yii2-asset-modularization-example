<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class DummyAsset extends AssetBundle
{
    public $css = [];

    public $js = [];

    public $depends = [
        CompiledAsset::class
    ];
}