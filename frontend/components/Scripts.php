<?php
/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

namespace frontend\components;

use Yii;
use yii\base\ActionEvent;
use yii\base\Component;
use yii\base\Event;
use yii\helpers\Html;
use yii\web\Controller;
use yii\web\Request;
use yii\web\Response;
use yii\helpers\Json;

class Scripts extends Component
{
    protected $injectScripts = true;

    /** @var Request */
    protected $request;

    /** @var Request */
    protected $controller;

    protected $viewConfigs = [];

    public $injectAfterLastTag = true;

    public function init()
    {
        parent::init();

        $this->request = Yii::$app->request;

        Event::on(Controller::class, Controller::EVENT_AFTER_ACTION, function(ActionEvent $event) {
            $this->controller = Yii::$app->controller;
            $this->injectAjaxScripts($event);
        });
    }

    public function disableScriptInject()
    {
        $this->injectScripts = false;
    }

    public function enableScriptInject()
    {
        $this->injectScripts = true;
    }

    public function configureView($viewName, $config)
    {
        $this->viewConfigs[$viewName] = $config;
    }

    protected function isAjaxRequest()
    {
        return $this->request->isAjax || $this->request->isPjax;
    }

    protected function getRunJs()
    {
        $currentModuleId = $this->controller->module !== null ? $this->controller->module->id : null;
        $appId = Yii::$app->id;

        $config = [
            'moduleId' => $appId === $currentModuleId ? null : $currentModuleId,
            'controllerId' => $this->controller->id,
            'actionId' => $this->controller->action->id,
            'route' => $this->controller->id . '/' . $this->controller->action->id,
            'isAjax' => $this->request->isAjax,
            'isPjax' => $this->request->isPjax,
            'modules' => [
                'view' => (object)$this->viewConfigs
            ]
        ];

        $jsConfig = Json::encode($config);

        if ($this->isAjaxRequest()) {
            return "; window.MainApp.runAjax({$jsConfig});";
        }

        return "; window.addEventListener('load', function() { window.MainApp.run({$jsConfig}); });";
    }


    protected function injectAjaxScripts(ActionEvent $event)
    {
        if (!$this->injectScripts) {
            return;
        }

        if (Yii::$app->response->format !== Response::FORMAT_HTML) {
            return;
        }

        $script = $this->getRunJs();

        if ($this->injectAfterLastTag) {
            $inject = Html::tag('script', $script);

            if (is_string($event->result)) {
                preg_match_all('/\<\/\w+>/sim', $event->result, $matches, PREG_OFFSET_CAPTURE);

                $lastTag = end($matches[0]);

                list($tag, $position) = !empty($lastTag) && count($lastTag) === 2 ? $lastTag : ['', 0];

                if (stripos($tag, 'script') !== false) {
                    $inject = $script;
                }

                $event->result = substr($event->result, 0, $position) . $inject . $tag;
            }

            return;
        }
        
        $event->result .= Html::tag('script', $script);
    }
}