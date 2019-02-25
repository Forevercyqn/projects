<?php

use Mvc\Container\Container;
use Mvc\Controller\AbstractController;
use Mvc\Db\Database;
use Mvc\JsonModel;
use Mvc\Request\Request;
use Mvc\ViewModel;

class IndexController extends AbstractController{
    public function __construct(){

    }

    function indexAction(){
        $view = new ViewModel();
        $view->setTerminal(true);
        return $view;
    }

    function loginAction(){
        $request = new Request();
        if($request->isPost()){
            $post = $request->getPost();
            $data = array('username'=>$post['name'],'password'=>$post['pass']);
            $db = new Database();
            $db->selectDB('collect_information');
            $result = $db->select("user",array('id','username','password','name','cell'),$data)->toArray();
            if(count($result)){
                $container = new Container();
                $container->set("name",$result[0]['name']);
                $container->set('id',$result[0]['id']);
                return new JsonModel(array('code'=>0,'msg'=>'login success','data'=>$result[0]));
            }
            else{
                return new JsonModel(array('code'=>1,'msg'=>'用户名或密码错误','data'=>array()));
            }
        }
    }

    function formineformAction(){
        return new ViewModel();
    }
}