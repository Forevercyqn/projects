<?php
/**
 * Created by PhpStorm.
 * User: yccjy
 * Date: 2018/11/7
 * Time: 21:04
 */

return [
    'routes'=>[
        'controllers'=>[
            'Application'=>[
                'defaultRoute'=>[
                    'controller'=>'Index',
                    'action'=>'index'
                ]
            ]
        ]
    ],
    'template'=>[
        'root_path'=>__DIR__,
        'templates_path'=>__DIR__.'/../view/',
        'layout'=>__DIR__.'/../view/layout/layout.phtml',
        '404'=>__DIR__.'/../view/layout/404.phtml'
    ]
];