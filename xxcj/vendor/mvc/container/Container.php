<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/12
 * Time: 16:38
 */

namespace Mvc\Container;

class Container{
    function set($key,$value){
        $_SESSION[$key] = $value;
    }

    function get($key = null){
        if($key !== null) return $_SESSION[$key];
        else return $_SESSION;
    }

    function delete($key){
        unset($_SESSION[$key]);
        return 1;
    }

    function clear(){
        foreach($_SESSION as $key=>$value){
            unset($_SESSION[$key]);
        }
        return 1;
    }
}