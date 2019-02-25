<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/7
 * Time: 20:58
 */
namespace Application;

use Mvc\Container\Container;
use Mvc\Module\InterfaceModel;

class Module implements InterfaceModel{
    function autoload(){
        return require_once __DIR__.'/config/module.config.php';
    }

    function onBootStrap(){
        $container = new Container();
        $user_id = $container->get("id");
        return $user_id;
    }
}