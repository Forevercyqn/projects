<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/11
 * Time: 18:26
 */
namespace Mvc;

class JsonModel{
    private $json;
    function __construct(array $data){
        $this->json = $data;
    }

    function getJson(){
        header('Content-type: application/json');
        return json_encode($this->json);
    }
}