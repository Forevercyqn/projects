<?php
session_start();

use Application\Module as DefaultModule;
use Mvc\JsonModel;
use Mvc\ViewModel;

spl_autoload_register('autoload');

require_once 'MvcCore.php';
$mvc_config = require_once './config/config.php';
$mvc_core = new MvcCore($mvc_config);
$mvc_module_text = $mvc_core->path['module'];
$mvc_controller_text = $mvc_core->path['controller'];
$mvc_modules = $mvc_core->modules;
if(in_array(ucfirst($mvc_module_text),$mvc_modules)){
    //模块可以调起
    require_once $mvc_config['modules_path']."/Application/Module.php";
    require_once $mvc_config['modules_path']."/".$mvc_module_text."/Module.php";
    $mvc_default_module = new DefaultModule();
    if(class_exists('Module')){
        $mvc_module = new Module();
        $mvc_module_config = array_merge_recursive($mvc_default_module->autoload(),$mvc_module->autoload());
    }
    else{
        $mvc_module = $mvc_default_module;
        $mvc_module_config = $mvc_default_module->autoload();
    }
    $bootStrap = null;
    if(method_exists($mvc_module,'onBootStrap')){
        $bootStrap = $mvc_module->onBootStrap();
    }
    $mvc_config = array_merge_recursive($mvc_config,$mvc_module_config);
    $mvc_controller = $mvc_controller_text."Controller";
    $mvc_action_text = $mvc_core->path['action'] !== "" ? $mvc_core->path['action'] : $mvc_config['routes']['controllers'][ucfirst($mvc_module_text)]['defaultRoute']['action'];
    $mvc_action = $mvc_action_text."Action";
    if(file_exists($mvc_config['modules_path']."/".$mvc_module_text."/src/Controller/".$mvc_controller_text."Controller.php")){
        require_once $mvc_config['modules_path']."/".$mvc_module_text."/src/Controller/".$mvc_controller_text."Controller.php";
    }
    else{
        cannotFindPage();
    }
    $Controller = new $mvc_controller($bootStrap);
    if(method_exists($Controller,$mvc_action)){
        $mvc_config['controller'] = $mvc_controller_text;
        $mvc_config['action'] = $mvc_action_text;
        $mvc_actioning = $Controller->$mvc_action();
        if($mvc_actioning instanceof ViewModel){
            //视图化
            $mvc_content = $mvc_actioning->renderPage();
            if(!$mvc_actioning->terminal){
                $mvc_actioning->echoLayout();
            }
            else{
                exit($mvc_content);
            }
        }
        elseif($mvc_actioning instanceof JsonModel){
            exit($mvc_actioning->getJson());
        }
        else{
            exit($mvc_actioning);
        }
    }
    else{
        //找不到action
        $view = new ViewModel();
        $error_page = $view->errorPage();
        $view->echoLayout($error_page);
        exit;
    }
}
else{
    //路由所对应模块不可用
    exit("该模块未被允许调用");
}

function autoload($class){
    if(file_exists("./vendor/mvc/{$class}.php")){
        require_once "./vendor/mvc/{$class}.php";
    }
    elseif(file_exists("./vendor/{$class}.php")){
        require_once "./vendor/{$class}.php";
    }
    elseif(file_exists("./modules/{$class}.php")){
        require_once "./modules/{$class}.php";
    }
}


function cannotFindPage(){
    $view = new ViewModel();
    $error_page = $view->errorPage();
    $view->echoLayout($error_page);
    exit;
}