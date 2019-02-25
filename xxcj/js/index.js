$(".user").eq(1).text(sessionStorage.getItem("username"));
$(".refer").on("click", function () {
    $(".content-item").hide();
    $("#publish").show();
    $(".title_third").show();
});
/*======================================渲染功能菜单，以及相应的提示信息显示===================================================*/

$(function () {
    //动态生成菜单选项
    var formArr = ['我的表单', '授权我的', '创建表单', '数据分析', '回收站']; //表单设置
    var systemArr = ['角色设置', '日志管理', '导出设置']; //系统设置
    var formArr_e = ['myform', 'formineform', 'createform', 'dataview', 'recycle']; //表单设置
    var systemArr_e = ['role', 'log']; //系统设置

    //遍历表单设置，生成对应的DOM结构
    $.each(formArr, function (index, element) {
        $formLi = $('<li class="li_select" data-name="' + formArr_e[index] + '"><span class="icon"></span><span>' + element + '</span></li>');
        $('#formList').append($formLi);
    });
    //遍历系统设置
    $.each(systemArr, function (index, element) {
        $systemLi = $('<li class="li_select" data-name="' + systemArr_e[index] + '"><span class="icon"></span><span>' + element + '</span></li>');
        $('#systemList').append($systemLi);
    });

    getCurrentPage();

    function getCurrentPage() {
        if ($('.li_select')) {
            $($('li')[0]).addClass('active');
            $('.li_select').on('click', function () {
                // var currentPage = $(this).data('name');
                var currentPage = $(this).text();
                sessionStorage.setItem('page', currentPage);
                $('.content-item').each(function () {
                    if ($(this).data('name') == currentPage) {
                        $(this).show().siblings().animate({height:'hide'},0);
                    }
                })

            })
        }
        var getPage = sessionStorage.getItem('page');

        $('.li_select').each(function () {
            if ($(this).data('name') == getPage) {

                $(this).addClass('active').siblings().removeClass('active');
            }
        })
        $('.content-item').each(function () {
            if ($(this).data('name') == getPage) {
                $(this).show().siblings().animate({height:'hide'},0);
            }
        })
        if (getPage == '角色设置' || getPage == '日志管理' || getPage == '导出设置') {
            $('.list_child').animate({
                height: 'hide'
            });
            if ($('.list_child')) {
                $($('.list_child')[1]).animate({
                    height: 'toggle'
                });
                $('.list_child').eq(0).children('.li_select').removeClass('active');
                $('.title_first').text('系统设置');
                $('.title_second').text(' > ' + getPage);
                $(".title_third").animate({height:'hide'},0);
            }

        } else {
            $('.content-item').each(function () {
                if ($(this).data('name') == getPage) {
                    $(this).show().siblings('.content-item').hide();
                }
            })
            $('.list_child').animate({
                height: 'hide'
            });
            if ($('.list_child')) {
                $($('.list_child')[0]).animate({
                    height: 'toggle'
                });
                $('.list_child').eq(1).children('.li_select').removeClass('active');
                $('.title_first').text('表单设置');
                $(".title_third").hide();
                if (getPage == null) {
                    $('.title_second').text(' > ' + "我的表单");
                } else {
                    $('.title_second').text(' > ' + getPage);
                }
            }
        }
    }
    var str1 = '';
    var str = '';
    var navArr = [];

    $(document).on('click', '.menu_title', function () {

        str1 = `${$(this).text()}`


        $(this).siblings('.list_child').animate({
            height: 'toggle'
        });

        $(this).parent('.list_item').siblings('.list_item').children('.list_child').animate({
            height: 'hide'
        });

    })

    $(document).on('click', '.li_select', function () {
        var name = $(this).data('name');


        if (name == "角色设置" || name == '日志管理' || name == "导出设置") {
            $('.title_first').text('系统设置');
        } else {
            $('.title_first').text('表单设置');
        }
        $(".title_third").hide();
        str = `> ${$(this).text()}`
        $('.title_second').text('');
        $('.title_second').append(str);
        console.log(str);
        // $(this).addClass("active").siblings().removeClass("active");
        // $(this).parents('.list_item').siblings('.list_item').children('ul').children('li').removeClass("active");
        // $('.icon').css('transform', 'rotate(0deg)');
        // $(this).children('.icon').css('transform', 'rotate(90deg)');
        window.location.assign(window.location.origin+'/application/'+name);
    })
});


/*==========================================================================角色设置==============================================================*/
// 导入layui模块
layui.use('layer', function () {
    var layer = layui.layer;
    var form = layui.form;
});

// 给对应功能模块绑定点击事件
// 新建角色
$(document).on('click', '#cs-newPart', function () {
    var $layerBox = $('.layui-layer')[0];
    if (!$layerBox) {
        layer.open({
            type: 1,
            title: '新建角色',
            area: ['470px', '470px'],
            shade: false,
            content: `
            <div class="cs-layer">
               <form class="layui-form cs-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">角色名称：<span class="c-r">*</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="title"  autocomplete="off"
                                class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <label class="layui-form-label">角色描述：</label>
                        <div class="layui-input-block">
                            <textarea name="desc" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">权限分配：<span class="c-r">*</span></label>
                        <div class="layui-input-block">
                            <div class="cs-select">
                                <ul class="cs-ul">
                                    <li class="cs-li">
                                        <span class="cs-setting"><i class="fa fa-sort-up"></i>表单设置</span>
                                        <dl class="cs-nav-dl">
                                            <dd><input type="checkbox"><span>我的表单</span></dd>
                                            <dd><input type="checkbox"><span>授权我的</span></dd>
                                            <dd><input type="checkbox"><span>创建表单</span></dd>
                                            <dd><input type="checkbox"><span>数据分析</span></dd>
                                            <dd><input type="checkbox"><span>回收站</span></dd>
                                        </dl>
                                    </li>
                                    <li class="cs-li">
                                        <span class="cs-setting"><i class="fa fa-sort-up"></i>系统设置</span>
                                        <dl class="cs-nav-dl">
                                            <dd><input type="checkbox"><span>角色设置</span></dd>
                                            <dd><input type="checkbox"><span>日志管理</span></dd>
                                            <dd><input type="checkbox"><span>导出设置</span></dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="cs-btn-group">
                        <button class="layui-btn cs-save">保存</button>
                        <button class="layui-btn cs-cancel">取消</button>
                    </div>
                </form>
            </div>
        `
        });
    }
});

//编辑角色
$(document).on('click', '#cs-editPart', function () {
    var $layerBox = $('.layui-layer')[0];
    if (!$layerBox) {
        layer.open({
            type: 1,
            title: '编辑角色',
            area: ['470px', '470px'],
            shade: false,
            content: `
            <div class="cs-layer">
               <form class="layui-form cs-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">角色名称：<span class="c-r">*</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="title" required lay-verify="required" autocomplete="off"
                                class="layui-input" value="超管">
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <label class="layui-form-label">角色描述：</label>
                        <div class="layui-input-block">
                            <textarea name="desc" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">权限分配：<span class="c-r">*</span></label>
                        <div class="layui-input-block">
                            <div class="cs-select">
                                <ul class="cs-ul">
                                    <li class="cs-li">
                                        <span class="cs-setting"><i class="fa fa-sort-up"></i>表单设置</span>
                                        <dl class="cs-nav-dl">
                                            <dd><input type="checkbox"><span>我的表单</span></dd>
                                            <dd><input type="checkbox"><span>授权我的</span></dd>
                                            <dd><input type="checkbox"><span>创建表单</span></dd>
                                            <dd><input type="checkbox"><span>数据分析</span></dd>
                                            <dd><input type="checkbox"><span>回收站</span></dd>
                                        </dl>
                                    </li>
                                    <li class="cs-li">
                                        <span class="cs-setting"><i class="fa fa-sort-up"></i>系统设置</span>
                                        <dl class="cs-nav-dl">
                                            <dd><input type="checkbox"><span>角色设置</span></dd>
                                            <dd><input type="checkbox"><span>日志管理</span></dd>
                                            <dd><input type="checkbox"><span>导出设置</span></dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="cs-btn-group">
                        <button class="layui-btn cs-save">保存</button>
                        <button class="layui-btn cs-cancel">取消</button>
                    </div>
                </form>
            </div>
        `
        });
    }
});

//删除角色
$(document).on('click', '#cs-deletePart', function () {
    var $layerBox = $('.layui-layer')[0];
    if (!$layerBox) {
        layer.confirm('您确定要删除吗？', {
            title: '信息'
        }, function (index) {
            //do something
        });
    }
});

//角色列表——删除角色
$(document).on('click', '.fa-trash', function () {
    var _this = $(this);
    layer.confirm('您确定要删除吗？', {
        title: '信息'
    }, function (index) {
        //确定的回调函数
        _this.parent().parent().remove();
        layer.close(index);
    }, function (index) {
        //取消的回调函数
        //doSomething
    });
});


var $ztree = $('.cs-ztree');
//添加人员
$(document).on('click', '#cs-addPerson', function () {
    var $layerBox = $('.layui-layer')[0];
    if (!$layerBox) {
        layer.open({
            type: 1,
            shade: false,
            title: ['选择用户', "background-color:#3A92C9;color:#fff;font-size:16px;"],
            area: ['500px', '572px'],
            content: '<div class="cs-ztree-wrap"></div>',
            success: function () {
                $('.cs-ztree-wrap').append($ztree);
                $ztree.show();
            }
        });
    }
});
//导出设置——添加人员
$(document).on('click', '#induce-addPerson', function () {
    var $layerBox = $('.layui-layer')[0];
    if (!$layerBox) {
        layer.open({
            type: 1,
            shade: false,
            title: ['选择用户', "background-color:#3A92C9;color:#fff;font-size:16px;"],
            area: ['500px', '572px'],
            content: '<div class="cs-ztree-wrap"></div>',
            success: function () {
                $('.cs-ztree-wrap').append($ztree);
                $ztree.show();
            }
        });
    }
});


// 添加成员————选项卡切换
// $(document).on('click', '.cs-tab li', function () {
//     $(this).addClass('cs-tab-active').siblings().removeClass('cs-tab-active');
//     $('.cs-content-item').eq($(this).index()).show().siblings().hide();
// });
//
//
// //角色列表的选项卡切换
// $(document).on('click', '#cs-part-list tr', function () {
//     $(this).addClass('cs-tab-now').siblings().removeClass('cs-tab-now');
//     $('.cs-tab-item').eq($(this).index()).show().siblings().hide();
// });

//树形菜单111
var zTreeObj;
var settings = {
    view: {
        selectedMulti: true
    },
    check: {
        enable: true
    }
};

//zTree的数据属性
var zNodes = [{
    "name": "办公室",
    "nocheck": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "财务部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "解决方案部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "研发部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "行业客户部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "产品部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
}
];

//初始化
$(document).ready(function () {
    zTreeObj = $.fn.zTree.init($("#cs-tree"), settings, zNodes);

    var tree = $.fn.zTree.getZTreeObj('cs-tree');
    //全部展开
    $(document).on('click', '#cs-openAll', function () {
        tree.expandAll(tree);
    });

    //全部收起
    $(document).on('click', '#cs-closeAll', function () {
        tree.expandAll(false);
    });
});


//树形菜单22222
var zTreeObj1;
var settings1 = {
    view: {
        selectedMulti: true
    },
    check: {
        enable: true
    }
};

//zTree的数据属性
var zNodes1 = [{
    "name": "吴强",
    "nocheck": false,
},
{
    "name": "张力文",
    "open": false,
},
{
    "name": "童乐",
    "open": false,
},
{
    "name": "张俪凡",
    "open": false,
},
{
    "name": "黄钰林",
    "open": false,
},
{
    "name": "黄方丽",
    "open": false,
},
{
    "name": "产品部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
},
{
    "name": "研发部",
    "open": false,
    "children": [{
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王二"
    }
    ]
}
];

//初始化
$(document).ready(function () {
    zTreeObj1 = $.fn.zTree.init($("#cs-tree1"), settings1, zNodes1);

    var tree1 = $.fn.zTree.getZTreeObj('cs-tree1');
    //全部展开
    $(document).on('click', '#cs-openAll', function () {
        tree1.expandAll(tree1);
    });

    //全部收起
    $(document).on('click', '#cs-closeAll', function () {
        tree1.expandAll(false);
    });
});

/*========================================================================授权我的====================================================================*/
/*
渲染表单
 */
/*function getform(name, start_time, end_time) {
    $.ajax({
        url: "http://47.107.109.114/InfoCollection/FindServlet",
        type: "post",
        data: {
            "name": name,
            "start_time": start_time,
            "end_time": end_time
        },
        dataType: "json",
        success: function (res) {
            console.log(res[0]);
            //便利当前数组
            for (var i = 0; i < res[0].length; i++) {
                switch (res[0][i].status) {
                    case 0:
                        res[0][i].status = "未开启";
                        break;
                    case 1:
                        res[0][i].status = "开始采集";
                        break;
                    case 2:
                        res[0][i].status = "暂停采集";
                        break;
                    case 3:
                        res[0][i].status = "采集完成";
                        break;
                    default:

                }
                var str = `<div class="col-xs-12 col-md-6 col-lg-4 bd_content_margin" data-id="${res[0][i].id}" data-name="我的表单">
            <div class="wdbd_content ">
                <div class="wdbd_content_head">
                    <div class="wdbd_content_head_title">
                        <span class="wdbd_content_title">${res[0][i].name}</span>
                        <div class="wdbd_content_progress">${res[0][i].status}</div>
                            <span class="wdbd_content_delete"><i class="layui-icon" style="font-size:26px;">&#xe640;</i></span>
                        </div>
                        <div class="wdbd_content_time">创建时间：<span class="create_time">${res[0][i].time}</span></div>
                    </div>
                <div class="wdbd_content_bottom wdbd-bottom">
                    <div class="wdbd_content_information">
                        <div class="wdbd_content_num">115</div>
                        <div class="wdbd_content_ecplain">已采集数据</div>
                    </div>
                    <div class="wdbd_content_information">
                        <div class="wdbd_content_num">32</div>
                        <div>今日新增</div>
                    </div>
                    <div class="wdbd_content_information">
                        <div class="wdbd_content_num">213</div>
                        <div>表单浏览量</div>
                    </div>
                    <div class="wdbd_content_operation ">
                        <div class="wdbd_content_icon bd-copy"> <img src="images/u3.png"></div>
                        <div class="wdbd_content_icon  bd-choosecolor">
                            <img src="images/u1.png">
                            <div class="wdbd_content_icon choosecolor"></div>
                        </div>
                        <div class="wdbd_content_icon bd-see"> <img src="images/u4.png"></div>
                        <div class="wdbd_content_icon bd-class"> <img src="images/u2.png"></div>
                    </div>

                </div>
            </div>
        </div>`;
                $(".wdbd_add").parents(".bd_content_margin").after(str);

            }
        }
    });
}
getform();
*/
//判断删除
$(".wdbd_content_progress").each(function (index, elem) {
    var thistext = $(this).text();
    if (thistext != "暂停中") {
        $(this).parents(".bd_content_margin").find(".wdbd_content_delete").css({
            opacity: "0",
            zIndex: -2
        });
    }
});


//四个按钮的提示信息
$(".bd-copy").mouseover(function () {
    $(this).attr("title", "复制");
})
$(".bd-choosecolor").mouseover(function () {
    $(this).attr("title", "背景");
})
$(".bd-see").mouseover(function () {
    $(this).attr("title", "预览");
})
$(".bd-class").mouseover(function () {
    $(this).attr("title", "分类");
})


/* 
日期选择
*/

layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '.createtime',
        type:'datetime'
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '.arrivetime',
        type:'datetime'
    });
});

layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '.createtime-sq',
        type:'datetime'
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '.arrivetime-sq',
        type:'datetime'
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '.arrivetime-sq',
        type:'datetime'
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#startTime',
        type:'datetime'
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#endTime',
        type:'datetime'
    });
});

/*
添加分类
*/
var temp = 1;
$(".wdbd_edit").on("click", function () {
    if (temp == 1) {
        //文字变化
        $(this).css({
            width: "80px"
        })
        $(this).html("完成编辑");
        $(".del_red").show();
        //添加弹框 
        var str = '<div class="wdbd_button wdbd_editclass"><i class="layui-icon" >&#xe654;</i></div>';
        $(this).before(str);
        temp = 0

    } else {
        $(this).css({
            width: ""
        })
        $(this).html('<i class="layui-icon">&#xe642;</i>');
        $(".del_red").hide();
        $(".wdbd_editclass").remove();
        //添加弹框  
        temp = 1;
    }

});
$(document).on("click", ".wdbd_editclass", function () {

    var str = '<div class="addclass_box"><input type="text" class=" wdbd_classinput"><i class="layui-icon delclass_icon" style="color:#418CC2">&#x1007;</i></div>';
    $(".wdbd_editclass").before(str);
})

$(document).on("click", ".delclass_icon", function () {
    $(this).parent().remove();
})

$(document).on("focusout", ".wdbd_classinput", function () {
    if ($(this).val()) {
        var str = "";
        str += `<div class="newclass_box"><div class="wdbd_newclass"></div><i class="layui-icon delclass_icon del_red" style="color:red">&#x1007;</i></div>`;
        $(".wdbd_editclass").before(str);

        $(".wdbd_newclass").last().text($(this).val());
        $(this).parent().remove();
    } else {
        $(this).parent().remove();
    }
})


// 改变元素的背景颜色
layui.use('colorpicker', function () {

    $('.bd-choosecolor').each(function () {
        var that = this;
        var that_div = $(that).children('.choosecolor');
        var colorpicker = layui.colorpicker;
        colorpicker.render({
            elem: that_div,
            done: function (color) {
                $(that).parents(".wdbd_content").css({
                    "backgroundColor": color
                })
            }
        });
    })


});


// 改变状态

$(document).on("click", ".wdbd_content_progress", function () {
    var that = $(this);
    if ($(this).text() == "暂停中") {
        $(this).html("正在收集");
        that.parents(".bd_content_margin").find(".wdbd_content_delete").css({
            opacity: 0,
            zIndex: -1
        });


    } else {
        $(this).html("暂停中");
        that.parents(".bd_content_margin").find(".wdbd_content_delete").css({
            opacity: 1,
            zIndex: 1
        });

    }
})

var currentform;
var domArr = new Array();
//删除表单
$(document).on("click", ".wdbd_content_delete", function () {
    var left_parent = $(this).parents(".wdbd_content_head_title");
    var form_title = left_parent.find(".wdbd_content_title").text();
    console.log(form_title);
    currentform = $(this).parents(".bd_content_margin ");
    //得到当前弹框的data-id
    var currentid = currentform.data("id");
    var currentname = currentform.data("name");

    var indexarr = {
        id: currentid,
        value: currentform,
        name: currentname
    }
    domArr.push(indexarr);


    layer.open({
        title: '信息',
        content: '<span class = "warning_text">您确定要删除吗？</span>',
        area: ["300px", "200px"],
        btn: ['确定', '取消'],
        btnAlign: 'c'

        , btn1: function (index, layero) {
            //将当前的表单删除
            currentform.remove();
            layer.closeAll();
            //将此文件添加到回收站
            var str = `<div class="recycle_box" data-id =${currentid} data-name=${currentname}><div class="rec_con"><div class="rec_icon"><img src="./images/rec2.jpg" alt=""></div><button class="rec_btn rec_form">还原</button><button class="rec_btn rec_remove">删除</button></div><p class="rec_nameaa">${form_title}</p></div>`;
            $(".pub_title_box").after(str);
        }

    });

})
//恢复删除的表单
$(document).on("click", ".rec_form", function () {
    var current_id = $(this).parents(".recycle_box").data("id");
    var current_name = $(this).parents(".recycle_box").data("name");
    var that = $(this);
    layer.open({
        title: '信息',
        area: ['300px', '150px'],
        // icon:1,
        content: '您确定要恢复吗？',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        btn1: function (index, layero) {
            for (var i = 0; i < domArr.length; i++) {
                if (domArr[i].name == current_name) {
                    if (domArr[i].id == current_id) {
                        if (current_name == "我的表单") {
                            $(".wdbd_add").parents(".bd_content_margin").after(domArr[i].value);
                            domArr.splice(i, 1);
                        } else {
                            $(".empower").append(domArr[i].value);
                            domArr.splice(i, 1);
                        }

                    } else {

                    }
                }
            }
            that.parents(".recycle_box").remove();
            layer.open({
                title: '信息',
                content: '操作成功',
                area: ['300px', '150px'],
                btn: "",
                time: 500
            });


        }

    });
})

//创建表单
$('.wdbd_add').on("click", function () {
    console.log(11);
    $(".li_select").each(function () {
        if ($(this).data('name') == '创建表单') {
            $(this).addClass('active').siblings(".li_select").removeClass("active");
        }
    })
    $(".content-item").each(function () {
        if ($(this).data('name') == "创建表单") {
            $(this).show().siblings('.content-item').hide();
        }
    })
    sessionStorage.setItem("page", "创建表单");
    $('.title_second').text(' > ' + "创建表单");
})

//复制表单
$(document).on("click", ".bd-copy", function () {
    var copyid = $(this).parents(".bd_content_margin").data("id") + "副本";
    var copyttitle = $(this).parents(".bd_content_margin").find(".wdbd_content_title").text();
    var reg = /[a-zA-Z0-9\u4e00-\u9fa5]+-副本$/;

    if (!reg.test(copyttitle)) {
        copyttitle = $(this).parents(".bd_content_margin").find(".wdbd_content_title").text() + "-副本";
    } else {
        copyttitle = $(this).parents(".bd_content_margin").find(".wdbd_content_title").text();
    }

    var str = $(this).parents(".bd_content_margin").clone();

    str.find(".wdbd_content_title").html(copyttitle)

    str.attr("data-id", copyid);
    $(this).parents(".bd_content_margin").after(str);
})


// 预览表单
$(document).on("click", ".bd-see", function () {
    var str_view = ` <div class="preview">
    <div class="preview-box"><div class="preview-title">单行文本框:</div><input type="text" placeholder="请输入"></div>
    <div class="preview-box"><div class="preview-title">数字输入框:</div><input type="text" placeholder="请输入"></div>
    <div class="preview-box"><div class="preview-title">日期选择:</div><input type="text" placeholder="选择"></div>
    <div class="preview-box"><div class="preview-title">手机输入:</div><input type="text" placeholder="选择"></div>
</div>`
    layer.open({
        title: '预览表单',
        content: str_view,
        btn: "",

    });

})



/**============================================================数据分析=========================================================== */
layui.use('element', function () {
    var $ = layui.jquery,
        element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块        
});
layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date2'
    });
    laydate.render({
        elem: '#date1'
    });

});
// 重置
if ($(".input-text").val() !== null || $(".form-time".val !== null)) {
    $(".reset").on("click", function () {
        $(".input-text").val("");
        $(".form-time").val("")
    })
}



/*==============================================================回收站 ===============================================================*/

// //删除回收站的表单
$(document).on('click', ".rec_remove", function () {
    var _this = this

    //弹出一个确认页面层
    layer.open({
        title: '确认删除文件',
        area: ['300px', '150px'],
        // icon:2,
        content: '确认要删除该文件，删除后将无法恢复',
        btn: ['确认', '取消'], //可以无限个按钮
        btn1: function (index, layero) {
            layer.close(index);
            $(_this).parent().parent().remove();
        },

    });
})
// 还原
// $(".rec_renew").on('click', function () {
//     //弹出一个确认页面层
//     layer.open({
//         title: '确认删除文件',
//         area: ['350px', '200px'],
//         content: '确认要还原文件吗？',
//         btn: ['确认', '取消'], //可以无限个按钮
//         icon: 1,
//         cancel: function (index, layero) {
//             layer.close(index)
//         }

//     });

// })
$('.rec_from_icon').on('click', function () {
    layer.tips('Hello tips!',
        '.rec_from_icon');

});