<?php

use Mvc\Container\Container;
use Mvc\Controller\AbstractController;
use Mvc\Db\Database;
use Mvc\Request\Request;
use Mvc\ViewModel;


class ForMineFormController extends AbstractController{
    private $user_id;
    private $container;

    public function __construct($user_id){
        if(!$user_id){
            $this->redirect('/application/index');
        }
        $this->container = new Container();
        $this->user_id = $this->container->get("id");
    }
    function indexAction(){
        $request = new Request();
        //获取当前的页面是第几页
        $page = $request->getQuery('page') ? (int)$request->getQuery('page') : 1;
        //每页展示多少个表格
        $pageCount = 2;
        $condition = array();
        $sqlnum = 'SELECT *  FROM form,grant_user_relation,USER WHERE grant_user_relation.to_user_id ='.$this->user_id.' AND form.id = grant_user_relation.form_id  AND grant_user_relation.from_user_id = user.id
        AND form.form_name like "%'.$condition["form_name"].'%"'.'
        limit '.($page-1)*$pageCount.','.$pageCount;

        if($request->getQuery('form_name')){
            $condition['form_name'] = $request->getQuery('form_name');
        }
        if($request->getQuery('create_time_start')){
            $condition['create_time>'] = date('Y-m-d H:i:s',strtotime($request->getQuery('create_time_start')));
        }
        if($request->getQuery('create_time_end')){
            $condition['create_time<'] = date('Y-m-d H:i:s',strtotime($request->getQuery('create_time_end')));
        }
        $condition = array_merge($condition,array('user_id'=>(int)$this->user_id,'del_status!'=>1));
//       var_dump($condition);

        $db = new Database();
        $db->selectDB("collect_information");
        $sql = 'SELECT *  FROM form,grant_user_relation,USER WHERE grant_user_relation.to_user_id ='.$this->user_id.' AND form.id = grant_user_relation.form_id  AND grant_user_relation.from_user_id = user.id';
        $result = mysqli_fetch_all($db->exec($sql),'3');





//        echo $sqlnum;
//        exit;

        $resultnum = mysqli_fetch_all($db->exec($sqlnum),'3');

        $pageNum = count($result);
        $pageNum = ceil($pageNum/$pageCount);
        return new ViewModel(array('data'=>$resultnum,'currentPage'=>$page,'maxPage'=>$pageNum,'condition'=>$condition));

    }
    function formineformAction(){

    }
}