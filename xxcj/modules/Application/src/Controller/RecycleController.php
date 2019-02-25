<?php

use Mvc\Controller\AbstractController;
use Mvc\ViewModel;


class RecycleController extends AbstractController{
    function indexAction(){
        return new ViewModel();
    }
}