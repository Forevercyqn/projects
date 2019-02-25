<?php
namespace Mvc;

class ViewModel{
    private $layout;
    private $error_page;
    private $template;
    public $terminal;
    private $data;
    private $content;

    public function __construct($data = null){
        global $mvc_config;
        $this->terminal = false;
        $this->template = is_array($mvc_config['template']['templates_path']) ? $mvc_config['template']['templates_path'][1] : $mvc_config['template']['templates_path'];
        $this->layout = is_array($mvc_config['template']['layout']) ? $mvc_config['template']['layout'][1] : $mvc_config['template']['layout'];
        $this->error_page = is_array($mvc_config['template']['404']) ? $mvc_config['template']['404'] : $mvc_config['template']['404'];
        if(is_array($data)) $this->data = $data;
    }

    function errorPage(){
        ob_start();
        require_once $this->error_page;
        $this->content = ob_get_clean();
        return $this->content;
    }

    function echoLayout($mvc_content = ''){
        require_once $this->layout;
    }

    function setTerminal($value = false){
        if(is_bool($value)){
            $this->terminal = $value;
        }
    }

    function renderPage(){
        global $mvc_config;
        if(is_array($this->data)){
            foreach($this->data as $key=>$value){
                global $$key;
                $$key = $value;
            }
        }
        ob_start();
        require_once $this->template.$mvc_config['controller']."/".$mvc_config['action'].".phtml";
        $this->content = ob_get_clean();
        if($this->terminal){
            return $this->content;
        }
    }
}