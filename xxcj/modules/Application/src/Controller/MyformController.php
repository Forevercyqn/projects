<?php

use Mvc\Container\Container;
use Mvc\Controller\AbstractController;
use Mvc\Db\Database;
use Mvc\Request\Request;
use Mvc\ViewModel;
use Mvc\JsonModel;


class MyformController extends AbstractController
{
    private $user_id;
    private $container;

    public function __construct($user_id)
    {
        if (!$user_id) {
            $this->redirect('/application/index');
        }
        $this->container = new Container();
        $this->user_id = $this->container->get("id");
    }
    //将对象转化为关联数组
    function object_to_array($obj)
    {
        $_arr = is_object($obj) ? get_object_vars($obj) : $obj;
        foreach ($_arr as $key => $val) {
            $val = (is_array($val) || is_object($val)) ? $this->object_to_array($val) : $val;
            $arr[$key] = $val;
        }
        return $arr;
    }

    function indexAction()
    {
        $request = new Request();
        $page = $request->getQuery('page') ? (int)$request->getQuery('page') : 1;
        $pageCount = 8;
        $condition = array();
        if ($request->getQuery('form_name')) {
            $condition['form_name'] = $request->getQuery('form_name');
        }
        if ($request->getQuery('create_time_start')) {
            $condition['create_time>'] = date('Y-m-d H:i:s', strtotime($request->getQuery('create_time_start')));
        }
        if ($request->getQuery('create_time_end')) {
            $condition['create_time<'] = date('Y-m-d H:i:s', strtotime($request->getQuery('create_time_end')));
        }
        $condition = array_merge($condition, array('user_id' => (int)$this->user_id, 'del_status!' => 1));
        $db = new Database();
        $db->selectDB("collect_information");
        $pageNum = count($db->select("form", array('id', 'form_name', 'create_time', 'form_status', 'table_name'), $condition, array('create_time' => 'desc'))->toArray());
        $result = $db->select("form", array('id', 'form_name', 'create_time', 'form_status', 'table_name'), $condition, array('create_time' => 'desc'), array(($page - 1) * $pageCount, $pageCount))->toArray();
        $pageNum = ceil($pageNum / $pageCount);
        return new ViewModel(array('data' => $result, 'currentPage' => $page, 'maxPage' => $pageNum, 'condition' => $condition));
    }

    //复制副本的操作
    //请求方式：post
    //url：/application/myform/clone
    //data 
    //抽出相同的数据再次插入，更改table_name,新建一张表
    function cloneAction()
    {
        $request = new Request(); //jsonmodel and viewmodel
        $container = new Container(); //session会话

        if ($request->isPost()) {
            $post = $request->getPost();
            $user_id = $this->user_id;
            $form_name = $post['form_name'];
            //格式化副本表名
            $clone_form_name = strpos($post['clone_form_name'], '-副本') ? (substr($form_name, 0, strpos($form_name, '-副本')) . '-副本-' . time()) : ($post['clone_form_name'] . '-' . time());

            $newtable = 'datatable_' . time();
            $db = new Database();
            $db->selectDB('collect_information');
            $condition = array('user_id' => (int)$user_id, 'form_name' => $form_name);
            $result = $db->select('form', null, $condition)->toArray()[0];
            $oldtable = $result['table_name'];
            $sql = 'create table ' . $newtable . ' like ' . $oldtable;  //创建一张复制表对应的空表
            //处理空字符为null,不为空不管;

            $data = array(
                'form_name' => $clone_form_name, 'form_status' => $result['form_status'], 'start_time' => $result['start_time'] | null,
                'stop_time' => $result['stop_time'] | null, 'submit_descrip' => $result['submit_descrip'], 'stop_num' => $result['stop_num'] | null,
                'create_time' => date("Y-m-d h:i:s"),
                'data' => $result['DATA'],
                'table_name' => $newtable,
                'user_id' => $user_id,
            );
            $msg = $db->insert('form', $data);

            $res = $db->exec($sql);

            //返回值确定
            if ($msg && $res) {
                return new JsonModel(array('code' => 0, 'msg' => '复制表单成功！'));
            } else {
                return new JsonModel(array('code' => 101, 'msg' => '发生错误！'));
            }


        }
    }
}