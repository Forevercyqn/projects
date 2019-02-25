<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/12
 * Time: 17:07
 */

namespace Mvc\Controller;

abstract class AbstractController{
    protected function toRoute(array $route){
        $url = "/".implode("/",$route);
        exit("<script>location.href='".$url."'</script>");
    }
    protected function toUrl($url){
        if(is_string($url)){
            exit("<script>location.href='".$url."'</script>");
        }
    }
    protected function redirect($parameter){
        if(is_array($parameter)){
            $url = "/".implode("/",$parameter);
        }
        elseif(is_string($parameter)){
            $url = $parameter;
        }
        else{
            $url = "";
        }
        header("Location:".$url,false,302);
    }
}