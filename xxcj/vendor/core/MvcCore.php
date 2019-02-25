<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/10
 * Time: 15:29
 */

class MvcCore{
    private $path;
    private $config;
    private $modules;
    private $db_config;
    private $module_config;

    function __construct($config){
        $server = $_SERVER;
        $route_path = substr($server['REDIRECT_URL'],1);
        $route_arr = strlen($route_path) ? explode("/",$route_path) : null;
        $this->path = [];
        $this->path['module'] = is_array($route_arr) && count($route_arr) ? $route_arr[0] : "application";
        $this->path['controller'] = isset($route_arr[1]) && $route_arr[1] ? $route_arr[1] : "index";
        $this->path['action'] = isset($route_arr[2]) && $route_arr[2] !== "" ? $route_arr[2] : "";
        $this->config = $config;
        $this->db_config = $config['db'];
        $this->modules = $config['modules'];
    }

    function __set($name, $value){
        // TODO: Implement __set() method.
        $this->$name = $value;
    }

    function __get($name){
        // TODO: Implement __get() method.
        return $this->$name;
    }
}



