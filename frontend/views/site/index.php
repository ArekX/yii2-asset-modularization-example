<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index" data-page-view="index-main-js">

    <div class="jumbotron">
        <h1>Congratulations!</h1>

        <p class="lead">This Yii 2 site is running with all non-dynamic assets minified!</p>
        <p>Check out <?= __FILE__ ?> to learn more.</p>

        <h2 data-to-text></h2>
    </div>

</div>

<?php
/** @var \frontend\components\Scripts $scripts */
$scripts = Yii::$app->scripts;
$scripts->configureView('index-main-js', [
    'text' => 'This value is rendered from PHP side config at ' . date('Y-m-d')
]);