<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/12
 * Time: 17:01
 */

namespace Mvc\Request;

class Request{
    private $request;
    private $post;
    private $get;

    public function __construct(){
        $this->request = $_SERVER;
        $this->post = $_POST;
        $this->get = $_GET;
    }

    public function getPost($key = null){
        if(!$key){
            return $this->post;
        }
        else{
            return $this->post[$key];
        }
    }

    public function getQuery($key = null){
        if(!$key){
            return $this->get;
        }
        else{
            return $this->get[$key];
        }
    }

    public function isPost(){
        if($this->request['REQUEST_METHOD'] == "POST"){
            return true;
        }
        else{
            return false;
        }
    }

    public function isGet(){
        if($this->request['REQUEST_METHOD'] == "GET"){
            return true;
        }
        else{
            return false;
        }
    }
}