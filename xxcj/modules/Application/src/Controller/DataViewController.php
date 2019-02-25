<?php

use Mvc\Controller\AbstractController;
use Mvc\ViewModel;


class DataViewController extends AbstractController{
    function indexAction(){
        return new ViewModel();
    }
}