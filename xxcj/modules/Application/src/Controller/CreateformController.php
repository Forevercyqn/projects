<?php
use Mvc\Container\Container;
use Mvc\Controller\AbstractController;
use Mvc\Db\Database;
use Mvc\JsonModel;
use Mvc\ViewModel;
use Mvc\Request\Request;

class CreateformController extends AbstractController
{
    function indexAction(){
        $request = new Request();
        $con = new Container();
        $user_id = $con->get('id');
        if($request->isPost()){
            $post = $request->getPost();
            $post['user_id'] = $user_id;
            $table_name = "datatable_".time();
            $post['create_time'] = date('Y-m-d H:i:s');
            $post['table_name'] = $table_name;
            $data_json = json_decode($post['data']);
            $data_arr = $data_json->data;
            $index = 0;
            $sql = "create table {$table_name}(id int primary key auto_increment,";
            $tempArr = array();
            foreach($data_arr as $value){
                $index++;
                $tempArr[] = $this->processData($value,$index);
            }
            $sql .= implode(",",$tempArr).")";
            $db = new Database();
            $db->selectDB("collect_information");
            $create_result = $db->exec($sql);
            if($create_result){
                $result = $db->insert("form",$post);
                if($result === true){
                    return new JsonModel(array('code'=>0,'msg'=>'创建表单成功','data'=>array()));
                }
                else{
                    return new JsonModel(array('code'=>101,'msg'=>$result));
                }
            }
        }
        return new ViewModel(array('name'=>$con->get("name"),'forms'=>array()));
    }

    function createformAction(){

    }

    function processData($data,$index){
        $type = $data->type === "date" ? "datetime " : "varchar(256) ";
        $yanzheng = $data->yanzheng === true ? "not null " : "";
        $unique = isset($data->unique) && $data->unique === true ? "unique " : "";
        $sql = "col".(string)$index." ".$type.$yanzheng.$unique;
        return $sql;
    }


    function publishAction(){
        $request = new Request();
        $con = new Container();

        if($request->isPost()){
            $post = $request->getPost();
            $data = array('form_name'=>$post['form_name'],'form_status'=>$post['form_status'],'start_time'=>$post['start_time'],
                'stop_time'=>$post['stop_time'],'submit_descrip'=>$post['submit_descrip'] ,'stop_num'=>$post['stop_num'],
                'create_time'=>date("Y-m-d h:i:sa"),
                'data'=>$con.get('data'));
            $db = new Database();
            $db->selectDB("collect_information");
            $db->insert(form,$data);

            return new JsonModel(array('code'=>0,'msg'=>'表单创建成功','data'=>$data));

        }
    }

}
