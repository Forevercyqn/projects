//左边拖动元素到中间手机框
$(".yuansu").on('mousedown', function (e) {
    var that = $(this);
    var type = that.data("type");
    var element = createFunctions[type]();
    var mouseX = e.pageX,
        mouseY = e.pageY;
    var time = new Date().getTime();
    var infoElement = createInfoFunctions[type]();
    element.data('signStr', time);
    infoElement.data('signStr', time);
    $('.toastinfo').append(infoElement);
    $("body").append(element);
    var elementWidth = element.width(),
        elementHeight = element.height();
    element.css({
        top: mouseY - (elementHeight / 2),
        left: mouseX - (elementWidth / 2)
    });
    $(window).on('mousemove', function (e) {
        element.show();
        element.css({
            top: e.pageY - (elementHeight / 2),
            left: e.pageX - (elementWidth / 2)
        });
    });
    $(window).one('mouseup', function (e) {
        var kuang = $(".right-panel");
        var kuangLeft = kuang.position().left,
            kuangTop = kuang.position().top;
        if (e.pageX < kuangLeft || e.pageY < kuangTop || e.pageX > kuangLeft + 400 || e.pageY > kuangTop + 800) {
            element.remove();
            infoElement.remove();
        } else {  //成功添加到手机框中
            var type = element.data('type');
            element.appendTo(kuang).css({
                position: "static",
                opacity: 1
            });
            //data中设置默认值
            element.data('yanzheng',false);//验证默认为false;
            element.data('unique',false);
            if(type == 'radio'||type =='checkbox'||type =='select'){
                element.removeData('unique'); 
            }else if(type == 'date'){
                element.data('date_form','1');
            }
            $('#p_container').scrollTop(10000);
        }
        $(window).off("mousemove");
    });
});
//-----------------------中间手机框中拖动代码---------------------------

$(document).on('mouseover','.create_yuansu',function(){
    $(this).children('img').show().siblings('i').css('marginRight','18px');
})
$(document).on('mouseleave','.create_yuansu',function(){
    $(this).children('img').hide().siblings('i').css('marginRight','30px')
})
$(document).on('click', '.create_yuansu', function (e) {

    var that = $(this);
    var type = $(this).data('type');
    $('.create_info').each(function () {
        if ($(this).data('signStr') == that.data('signStr')) {
            $(this).show().siblings().hide();
            $(this).addClass('active').siblings('.create_info').removeClass('active');
        }
    })
    var element = createInfoFunctions[type]();
    $('#clear').remove();
})
var offsetY, offsetX;
$(document).on('mousedown', '.create_yuansu', function (e) {
    var that = $(this);
    var type = that.data("type");
    var mouseX = e.pageX,
        mouseY = e.pageY;
    var elementWidth = that.width(),
        elementHeight = that.height();
    var localName = e.target.localName;
    if (localName == 'input') {
        var s_width = $(e.target).siblings('span').width()+11;  //border:2 padding:10;
        offsetX = e.offsetX + s_width;
        offsetY = e.offsetY+7;
    }else if(localName == 'span'){
        offsetX = e.offsetX+6;
        offsetY = e.offsetY+7;
    }else if(localName == 'i'){
        offsetX = e.offsetX+149;
        offsetY = e.offsetY+7;
    }else if(localName == 'img'){
        offsetX = e.offsetX+177;
        offsetY = e.offsetY+21;
        $('.create_info').each(function(){
            if($(this).data('signStr')==that.data('signStr')){
                $(this).remove();
            }
        })
        $(this).remove();
    }
    else {
        offsetX = e.offsetX+1;
        offsetY = e.offsetY+7;
    }
    that.css({
        position: 'fixed',
        top: mouseY - offsetY,
        left: mouseX - offsetX
    });
    that.after('<div id="clear"></div>');
    var currentTop = 0;
    var num_down = 0,
        num_up = 0,
        length = 0, //create_yuansu的总长度
        index = 0;//当前真正移动元素的下标+1
    var initTop = parseInt(that.css('top'));
    $(window).on('mousemove', function (e) {
        $('#clear').remove();
        that.css({
            position: 'absolute',
            top: e.pageY - offsetY,
            left: e.pageX - offsetX,
            zIndex: 5,
            cursor:'move'
        });
        length = $('.create_yuansu').length;
        $('.create_yuansu').each(function(i){
            if($(this).hasClass('item-active')){
                index = i+1;
            }
        })
        currentTop = parseInt(that.css('top'))
        if (currentTop - initTop > elementHeight) {
            num_down = parseInt((currentTop - initTop) / (elementHeight + 10));
            // console.log('向下移动了' + num_down + '个');
        } else if (initTop - currentTop > elementHeight) {
            num_up = parseInt((initTop - currentTop) / elementHeight);
            // console.log("向上移动了" + num_up + "个");
        }
    });
    $(window).one('mouseup', function (e) {
        $('#clear').remove();
        var kuang = $(".right_panel");
        if (num_down > 0) {
            if(num_down>length-index){
                num_down = length-index;
            }
            var next = that;
            for (var i = 0; i < num_down; i++) {
                next = next.next();
            }
            next.after(that);
            that.css({
                position: 'static'
            })
        }
        if (num_up > 0) {
            if(num_up>index-1){
                num_up = index-1;
            }
            var next1 = that;
            for (var i = 0; i < num_up; i++) {
                next1 = next1.prev();
            }
            next1.before(that);
            that.css({
                position: 'static'
            })
        }
        if (num_up == 0 || num_down == 0) {
            that.css({
                position: 'static'
            })
        }
        $(window).off("mousemove");
        num_down = 0, num_up = 0
    });
})

//--------------------右侧info信息变化①改变左边对应值②把响应数据写到左侧div的data中---------------
$(document).on('change', '.create_info input', function () {
    var that = $(this);
    var signStr;
    if ($(this).data('name') == 'single_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'single_placeholder') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('input').attr('placeholder', that.val());
                $(this).data('placeholder', that.val());
            }
        })
    } else if ($(this).data('name') == 'select_moren') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('input').attr('placeholder', that.val());
                $(this).data('moren', that.val());
            }
        })
    } else if ($(this).data('name') == 'single_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                // $(this).children('input').attr('placeholder',that.val());
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    } else if ($(this).data('name') == 'single_unique') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                // $(this).children('input').attr('placeholder',that.val());
                $(this).data('unique', that.prop('checked'));
            }
        })
    }

    //多行
    if ($(this).data('name') == 'multi_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'multi_placeholder') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('input').attr('placeholder', that.val());
                $(this).data('placeholder', that.val());
            }
        })
    } else if ($(this).data('name') == 'multi_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                // $(this).children('input').attr('placeholder',that.val());
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    } else if ($(this).data('name') == 'multi_unique') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                // $(this).children('input').attr('placeholder',that.val());
                $(this).data('unique', that.prop('checked'));
            }
        })
    }

    //单选
    if ($(this).data('name') == 'radio_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    }else if ($(this).data('name') == 'radio_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    }
    //复选
    if ($(this).data('name') == 'checkbox_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'checkbox_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    }
    //下拉
    if ($(this).data('name') == 'select_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'select_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    }
    //附件
    if ($(this).data('name') == 'file_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'file_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    } else if ($(this).data('name') == 'file_unique') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('unique', that.prop('checked'));
            }
        })
    }

    //日期
    if ($(this).data('name') == 'date_title') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).children('span').text(that.val());
                $(this).data('title', that.val());
            }
        })
    } else if ($(this).data('name') == 'date_form') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('date_form', that.val());
            }
        })
    } else if ($(this).data('name') == 'date_yanzheng') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('yanzheng', that.prop('checked'));
            }
        })
    } else if ($(this).data('name') == 'date_unique') {
        signStr = $(this).parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('unique', that.prop('checked'));
            }
        })
    }
})
$(document).on('click', '.create_info button', function () {
    var that = $(this);
    var signStr;
})
//单选、多选、下拉中添加选项
$(document).on('click', '.add a', function () {
    var str = '<div class="itemBox"><input type="text" data-checkTitle="选项名" value="选项"><img src="images/remove.png"></div>'
    $(this).parent().siblings('.optionBox').append(str).scrollTop(1000);
})
//单选、多选、下拉中删除选项
var option_arr = [];
$(document).on('click','.itemBox img',function(){
    var optionBox = $(this).parents('.optionBox');
    var that = optionBox.children('.itemBox').get(0);
    $(this).parent().remove();
    add_option(that,optionBox);
})
//
$(document).on('change','.optionBox input',function(){
    add_option(this);
})
function add_option(that,optionBox){
    option_arr = [];
    var radio = $(that).parents('._radio');
    var checkbox = $(that).parents('._checkbox');
    var select = $(that).parents('._select');
    var signStr = '';
    //选项input一旦改变，就遍历input，将选项值存入一个数组；
    if (optionBox) {
        if (optionBox.hasClass('._radio')) {
            radio = optionBox;
        } else if (optionBox.hasClass('._checkbox')) {
            checkbox = optionBox;
        } else {
            select = optionBox;
        }
        optionBox.find('input').each(function () {
            option_arr.push($(this).val());

        })
    }else{
        $(that).parents('.optionBox').find('input').each(function(){
            option_arr.push($(this).val());
        })
    }
    if(radio.length>0){
        console.log('radio');
        signStr = radio.parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('option', option_arr);
            }
        })
    }else if(checkbox.length>0){
        signStr = checkbox.parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('option', option_arr);
            }
        })
    }else if(select.length>0){
        signStr = select.parent().data('signStr');
        $('.create_yuansu').each(function () {
            if ($(this).data('signStr') == signStr) {
                $(this).data('option', option_arr);
            }
        })
    }
}

//创建中间手机框中元素
var createFunctions = {
    single: function () {
        return $('<div class="item create_yuansu" data-type="single" data-title="单行输入框"><span class="item-title">单行输入框</span><input type="text" placeholder="请输入对应的内容" readonly><img src="images/remove1.png"></div>');
    },
    multi: function () {
        return $('<div class="item create_yuansu" data-type="multi" data-title="多行输入框"><span class="item-title">多行输入框</span><input type="text" placeholder="请输入对应的内容" readonly><img src="images/remove1.png"></div>');
    },
    radio: function () {
        return $('<div class="item create_yuansu" data-type="radio" data-title="单选框"><span class="item-title">单选框</span><img src="images/remove1.png"><i class="fa fa-dot-circle-o"></i></div>');
    },
    checkbox: function () {
        return $('<div class="item create_yuansu" data-type="checkbox" data-title="多选框"><span class="item-title">多选框</span><img src="images/remove1.png"><i class="fa fa-check-square-o"></i></div>');
    },
    select: function () {
        return $('<div class="item create_yuansu" data-type="select" data-title="下拉框"><span class="item-title">下拉框</span><img src="images/remove1.png"><i class="fa fa-chevron-down"></i></div>');
    },
    file: function () {
        return $('<div class="item create_yuansu" data-type="file" data-title="附件"><span class="item-title">附件</span><img src="images/remove1.png"><i class="fa fa-file-o"></i></div>');
    },
    date: function () {
        return $('<div class="item create_yuansu" data-type="date" data-title="日期"><span class="item-title">日期</span><img src="images/remove1.png"><i class="fa fa-calendar"></i></div>');
    }
};


//创建右侧信息函数。
var createInfoFunctions = {
    single: function () {
        return $('<div class="create_info" data-type="single" style="display: none"><p>标题：最多10字</p><input type="text" placeholder="单行文本框" data-name="single_title"><br><p>提示文字：最多10个字</p><input type="text" placeholder="我是单行，请输入" data-name="single_placeholder"><br>验证：<input type="checkbox" data-name="single_yanzheng"> 必填<br>唯一：<input type="checkbox" data-name="single_unique"> 是</div>')
    },
    multi: function () {
        return $('<div class="create_info" data-type="multi" style="display: none"><p>标题：最多10字</p><input type="text" placeholder="多行文本框" data-name="multi_title"><br><p>提示文字：最多10个字</p><input type="text" placeholder="我是多行，请输入" data-name="multi_placeholder"><br>验证：<input type="checkbox" data-name="multi_yanzheng"> 必填<br>唯一：<input type="checkbox" data-name="multi_unique"> 是</div>')
    },
    select: function () {
        return $(
            '<div class="create_info" style="display:none;" data-type="select"><p>标题：最多十个字</p><input type="text" name="title" value="下拉框" data-name="select_title"><p class="add">选项：<a href="#"><img src="images/add.png" alt="">&nbsp;&nbsp;点击添加</a></p><div class="optionBox _select"><div class="itemBox"><input class="select_moren" type="text" data-itemTitle="请选择" value="请选择" readonly><span class="redText">默认文字</span></div><div class="itemBox"><input type="text" data-itemTitle="选项名" value="选项" ><img src="images/remove.png"></div></div><br><span>验证：</span><input type="checkbox" data-name="select_yanzheng">&nbsp;必填</div>'
        );
    },
    radio: function () {
        return $(
            '<div class="create_info" style="display:none;" data-type="radio"><p>标题：最多十个字</p><input type="text" name="title" value="单选框" data-name="radio_title"><p class="add">选项：<a href="#"><img src="images/add.png" alt="">&nbsp;&nbsp;点击添加</a></p><div class="optionBox _radio"><div class="itemBox"><input type="text" data-checkTitle="选项名" value="选项"><img src="images/remove.png"></div><div class="itemBox"><input type="text" data-checkTitle="选项名" value="选项"><img src="images/remove.png"></div></div><br><span>验证：</span><input type="checkbox" data-name="radio_yanzheng">&nbsp;必填</div>'
        );
    },
    checkbox: function () {
        return $(
            '<div class="create_info" style="display:none;" data-type="checkbox" ><p>标题：最多十个字</p><input type="text" name="title" value="多选框" data-name="checkbox_title"><p class="add">选项：<a href="#"><img src="images/add.png" alt="">&nbsp;&nbsp;点击添加</a></p><div class="optionBox _checkbox"><div class="itemBox"><input type="text" data-checkTitle="选项名" value="选项" ><img src="images/remove.png"></div><div class="itemBox"><input type="text" data-checkTitle="选项名" value="选项" ><img src="images/remove.png"></div></div><br><span>验证：</span><input type="checkbox"  data-name="checkbox_yanzheng">&nbsp;必填</div>'
        );
    },
    file: function () {
        return $('<div class="create_info" data-type="file" style="display: none"><p>标题：最多10字</p><input type="text" value="附件" data-name="file_title"><br>验证：<input type="checkbox" data-name="file_yanzheng"> 必填<br>唯一：<input type="checkbox" data-name="file_unique"> 是<br><p class="shuoming">说明：此附件不能再微信端操作</p></div>')
    },
    date: function () {
        return $('<div class="create_info" data-type="date" style="display: none"><p>标题：最多10字</p><input type="text" value="日期" data-name="date_title"><br> <p>日期格式:</p><br><input type="radio" checked data-name="date_form" name="dateform" value=1><span>年-月-日 时-分-秒</span><br></p><input type="radio" data-name="date_form" name="dateform" value=2><span>年-月-日</span><br> <p>验证：</p><input type="checkbox" data-name="date_yanzheng"> 必填<br>唯一：<input type="checkbox" data-name="date_unique"> 是</div>')
    }
}
//-------------------------------------------------------------
//中间手机框中元素，点击后显示效果
$('.right-panel').on('mousedown', '.item', function () {
    $(this).addClass('item-active').siblings().removeClass('item-active');
});
var final_json = '';
$(document).on('click','.control_form .refer',function(){
    var final_arr = [],final_obj = {};
    $('.right-panel .create_yuansu').each(function(){
        final_arr.push($(this).data());
    })
    final_obj['data'] = final_arr;
    final_json = JSON.stringify(final_obj);
    console.log(final_obj);
    console.log(final_json);
})