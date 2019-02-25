<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/12
 * Time: 16:13
 */

namespace Mvc\Db;

class Database{
    private $conn;
    private $resultSet;
    private $database = false;

    public function __construct(){
        global $mvc_config;
        $this->conn = mysqli_connect($mvc_config['db']['address'],$mvc_config['db']['user'],$mvc_config['db']['password'],$mvc_config['db']['database'],$mvc_config['db']['port']);
        if(!$this->conn){
            exit("数据库连接失败！");
        }
        mysqli_query($this->conn,'set names utf8');
    }

    function selectDB($db_name){
        $this->database = $db_name;
        return mysqli_select_db($this->conn,$db_name);
    }

    /**
     * 插入数据
     * @param $table，表名
     * @param $data，需要插入的数据，应当为数组类型，采用列名=>值的键值对形式
     * @return bool|\mysqli_result|string
     */
    function insert($table,$data){
        if($this->database === false){
            exit("未选择数据库！");
        }
        $condition = $this->processCondition($data,2);
        $sql = "insert into ".$table."(".$condition['keys'].") values(".$condition['values'].")";
        $result = mysqli_query($this->conn,$sql);

        if($result){
            return $result;
        }
        else{
            return mysqli_error($this->conn);
        }
    }

    /**
     * 查询数据
     * @param $table，表名
     * @param null $col，列名，数组类型，采用非关联数字数组类型，即array("列1","列2")这种
     * @param null $where，条件，数组类型，采用列=>值的键值对形式
     * @param null $order，排序条件，数组类型，采用列=>值的键值对形式，例如array("create_time","desc")
     * @param null $limit，界限条件，数组类型，采用非关联数组，例如array("10","10")
     * @return $this，返回值为对象本身，需要立刻调用toArray()方法
     */
    function select($table,$col = null,$where = null,$order = null,$limit = null){
        if($this->database === false){
            exit("未选择数据库！");
        }
        $sql = "select ";
        if($col === null){
            $sql .= "* from ".$table." ";
        }
        elseif(is_array($col)){
            $tempCondition = $this->processCondition($col);
            $sql .= $tempCondition['values']." from ".$table." ";
        }
        if(is_array($where)){
            $tempWhere = $this->processWhere($where);
            $sql .= "where ".$tempWhere." ";
        }
        else if(is_string($where)){
            $sql .= "where ".$where." ";
        }
        if(is_array($order)){
            $sql .= "order by ".$this->processOrder($order)." ";
        }
        if(is_array($limit)){
            $sql .= "limit ".implode(",",$limit);
        }
        $this->resultSet = mysqli_query($this->conn,$sql);
        return $this;
    }

    /**
     * 删除数据
     * @param $table，表名
     * @param $where，条件，数组类型，列=>值的键值对形式
     * @return bool|\mysqli_result
     */
    function delete($table,$where){
        if($this->database === false){
            exit("未选择数据库！");
        }
        $sql = "delete from ".$table." ";
        if(is_array($where)){
            $sql .= "where ".$this->processWhere($where);
        }
        elseif(is_string($where)){
            $sql .= $where;
        }
        return mysqli_query($this->conn,$sql);
    }

    /**
     * 更新数据
     * @param $table，表名
     * @param $condition，数据，采用列=>值的键值对类型数组
     * @param $where，条件，同上
     * @return bool|\mysqli_result
     */
    function update($table,$condition,$where){
        if($this->database === false){
            exit("未选择数据库！");
        }
        $sql = "update ".$table." set ";
        if(is_array($condition)){
            $sql .= $this->processCondition($condition,"update")." ";
        }
        elseif(is_string($condition)){
            $sql .= $condition;
        }
        if(is_array($where)){
            $sql .= "where ".$this->processWhere($where);
        }
        elseif(is_string($where)){
            $sql .= $where;
        }
        return mysqli_query($this->conn,$sql);
    }

    /**
     * 在select方法后必须被立即执行的方法
     * @return array|null
     */
    function toArray(){
        return mysqli_fetch_all($this->resultSet,3);
    }

    /**
     * 内部处理数据函数
     * @param $condition
     * @param int $type
     * @return array|string
     */
    private function processCondition($condition,$type = 1){
        $tempArrOne = array();
        $tempArrTwo = array();
        foreach($condition as $key=>$value){
            $tempArrOne[] = $key;
            if(is_string($value) && ($type === 2 || $type === "update")){
                $tempArrTwo[] = "'".$value."'";
            }
            else{
                $tempArrTwo[] = $value;
            }
        }
        if($type === "update"){
            $tempArr = array();
            for($i = 0;$i < count($tempArrOne);$i++){
                $tempArr[] = $tempArrOne[$i]."=".$tempArrTwo[$i];
            }
            return implode(",",$tempArr);
        }
        else{
            return array('keys'=>implode(",",$tempArrOne),'values'=>implode(",",$tempArrTwo));
        }
    }

    /**
     * 同上
     * @param $condition
     * @return string
     */
    private function processWhere($condition){
        $tempArr = array();
        foreach($condition as $key=>$value){
            if(is_string($value)){
                $tempArr[] = $key."='".$value."'";
            }
            else{
                $tempArr[] = $key."=".$value;
            }
        }
        return implode(" and ",$tempArr);
    }

    /**
     * 同上
     * @param $condition
     * @return string
     */
    private function processOrder($condition){
        $tempArr = array();
        foreach($condition as $key=>$value){
            $tempArr[] = $key." ".$value;
        }
        return implode(",",$tempArr);
    }

    /**
     * 立即执行一条sql，返回原生结果，可用来在不方便使用其他方法时手写sql来调用
     * @param $sql
     * @return bool|\mysqli_result
     */
    function exec($sql){
        return mysqli_query($this->conn,$sql);
    }
}