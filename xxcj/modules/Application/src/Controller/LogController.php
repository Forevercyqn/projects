<?php


use Mvc\Controller\AbstractController;
use Mvc\Db\Database;
use Mvc\JsonModel;
use Mvc\ViewModel;

class LogController extends AbstractController{

    function indexAction(){
        $db = new Database();
        $db->selectDB("collect_information");
        $username=$db->select('user',array('username'))->toArray();
        $operate_type=$db->select('operate_type',array('type_name'))->toArray();

        $sql="select log_manage.id,log_manage.happen_time,
            form.form_name,user.username,operate_type.type_name
            from form,user,log_manage,operate_type 
            where form.id=log_manage.form_id 
            and user.id=log_manage.operator_id 
            and operate_type.id=log_manage.oprate_type_id";
        $result = mysqli_fetch_all($db->exec($sql),3);
        //var_dump($result);
        if($result){
            return new ViewModel(array('data'=>$result,'username'=>$username,'operate_type'=>$operate_type));
        }else{
            return new ViewModel(array('username'=>$username,'operate_type'=>$operate_type));
        }

    }
}