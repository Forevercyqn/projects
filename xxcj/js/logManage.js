var newData = [];
var operatorArr=[];
var operationTypeArr=[];

//时间选择
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#startTime' //指定元素
    });
});
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#endTime' //指定元素
    });
});

var val1;
var val2_1;
var val2_2;
var val3;
var val4;

function select1(val) { //表名
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val) {
            newData.push(testData[i])
        }
    }
}

function select2(val) { //开始时间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val) {
            newData.push(testData[i])
        }
    }
}

function select3(val) { //结束时间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime <= val) {
            newData.push(testData[i])
        }
    }
}

function select4(val) { //操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].operator == val) {
            newData.push(testData[i])
        }
    }
}

function select5(val) { //操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].operationType == val) {
            newData.push(testData[i])
        }
    }
}

function select6(val1, val2) { //时间区间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val1 && testData[i].happenTime <= val2) {
            newData.push(testData[i])
        }
    }
}

function select7(val1, val2) { //表名+开始时间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2) {
            newData.push(testData[i])
        }
    }
}

function select8(val1, val2) { //表名+结束时间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime <= val2) {
            newData.push(testData[i])
        }
    }
}

function select9(val1, val2, val3) { //表名+时间区间
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].happenTime <= val3) {
            newData.push(testData[i])
        }
    }
}

function select10(val1, val2) { //表名+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].operator == val2) {
            newData.push(testData[i])
        }
    }
}

function select11(val1, val2) { //表名+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].operationType == val2) {
            newData.push(testData[i])
        }
    }
}

function select12(val1, val2) { //开始时间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val1 && testData[i].operator == val2) {
            newData.push(testData[i])
        }
    }
}

function select13(val1, val2) { //开始时间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val1 && testData[i].operationType == val2) {
            newData.push(testData[i])
        }
    }
}

function select14(val1, val2) { //结束时间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime <= val1 && testData[i].operator == val2) {
            newData.push(testData[i])
        }
    }
}

function select15(val1, val2) { //结束时间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime <= val1 && testData[i].operationType == val2) {
            newData.push(testData[i])
        }
    }
}

function select16(val1, val2, val3) { //时间区间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val1 && testData[i].happenTime <= val2 && testData[i].operator == val3) {
            newData.push(testData[i])
        }
    }
}

function select17(val1, val2, val3) { //时间区间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].happenTime >= val1 && testData[i].happenTime <= val2 && testData[i].operationType == val3) {
            newData.push(testData[i])
        }
    }
}

function select18(val1, val2) { //操作人+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].operator == val1 && testData[i].operationType == val2) {
            newData.push(testData[i])
        }
    }
}

function select19(val1, val2, val3) { //表名+开始时间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].operator == val3) {
            newData.push(testData[i])
        }
    }
}

function select20(val1, val2, val3) { //表名+结束时间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime <= val2 && testData[i].operator == val3) {
            newData.push(testData[i])
        }
    }
}

function select21(val1, val2, val3) { //表名+开始时间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].operationType == val3) {
            newData.push(testData[i])
        }
    }
}

function select22(val1, val2, val3) { //表名+结束时间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime <= val2 && testData[i].operationType == val3) {
            newData.push(testData[i])
        }
    }
}

function select23(val1, val2, val3, val4) { //表名+时间区间+操作人
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].happenTime <= val3 && testData[i].operator == val4) {
            newData.push(testData[i])
        }
    }
}

function select24(val1, val2, val3, val4) { //表名+时间区间+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].happenTime <= val3 && testData[i].operationType == val4) {
            newData.push(testData[i])
        }
    }
}

function select25(val1, val2, val3) { //表名+操作人+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].operator == val2 && testData[i].operationType == val3) {
            newData.push(testData[i])
        }
    }
}

function select26(val1, val2, val3, val4) { //表名+开始时间+操作人+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].operator == val3 && testData[i].operationType == val4) {
            newData.push(testData[i])
        }
    }
}

function select27(val1, val2, val3, val4) { //表名+结束时间+操作人+操作类型
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime <= val2 && testData[i].operator == val3 && testData[i].operationType == val4) {
            newData.push(testData[i])
        }
    }
}

function select28(val1, val2, val3, val4, val5) { //全部
    for (var i = 0; i < testData.length; i++) {
        if (testData[i].tableName == val1 && testData[i].happenTime >= val2 && testData[i].happenTime <= val3 && testData[i].operator == val4 && testData[i].operationType == val5) {
            newData.push(testData[i])
        }
    }
}


$('.lm_top_select').on('click', function () {
    newData = [];
    val1 = $('.lm_top_formName input').val(); //表名
    val2_1 = $($('.lm_top_happenTime input')[0]).val(); //开始时间
    val2_2 = $($('.lm_top_happenTime input')[1]).val(); //结束时间
    val3 = $('#operator').find("option:selected").text(); //操作人
    val4 = $('#operationType').find("option:selected").text(); //操作类型

    //全不填时点击查询显示全部
    if (!val1 && !val2_1 && !val2_2 && val3 == '请选择' && val4 == '请选择') {
        showTable(testData);
        return;
    }

    function goSelect() {
        if (val1) {
            if (val2_1) {
                if (val2_2) {
                    if (val3 != '请选择') {
                        if (val4 != '请选择') {
                            select28(val1, val2_1, val2_2, val3, val4)
                            return;
                        }
                        select23(val1, val2_1, val2_2, val3)
                        return;
                    }
                    if (val4 != '请选择') {
                        select24(val1, val2_1, val2_2, val4)
                        return;
                    }
                    select9(val1, val2_1, val2_2);
                    return;
                }
                if (val3 != '请选择') {
                    if (val4 != '请选择') {
                        select26(val1, val2_1, val3, val4)
                        return;
                    }
                    select19(val1, val2_1, val3)
                    return;
                }
                if (val4 != '请选择') {
                    select21(val1, val2_1, val4)
                    return;
                }
                select7(val1, val2_1)
                return;
            }
            if (val2_2) {
                if (val3 != '请选择') {
                    if (val4 != '请选择') {
                        select27(val1, val2_2, val3, val4)
                        return;
                    }
                    select20(val1, val2_2, val3)
                    return;
                }
                if (val4 != '请选择') {
                    select22(val1, val2_2, val4)
                    return;
                }
                select8(val1, val2_2)
                return;
            }
            if (val3 != '请选择') {
                if (val4 != '请选择') {
                    select25(val1, val3, val4)
                    return;
                }
                select10(val1, val3)
                return;
            }
            if (val4 != '请选择') {
                select11(val1, val4);
                return;
            }
            select1(val1);
            return;
        }
        if (val2_1) {
            if (val2_2) {
                if (val3 != '请选择') {
                    if (val4 != '请选择') {
                        select5(val4);
                        return;
                    }
                    select16(val2_1, val2_2, val3)
                    return;
                }
                if (val4 != '请选择') {
                    select17(val2_1, val2_2, val4)
                    return;
                }
                select6(val2_1, val2_2);
                return;
            }
            if (val3 != '请选择') {
                if (val4 != '请选择') {
                    select5(val4);
                    return;
                }
                select12(val2_1, val3);
                return;
            }
            if (val4 != '请选择') {
                select13(val2_1, val4)
                return;
            }
            select2(val2_1);
            return;
        }
        if (val2_2) {
            if (val3 != '请选择') {
                if (val4 != '请选择') {
                    select5(val4);
                    return;
                }
                select14(val2_2, val3)
                return;
            }
            if (val4 != '请选择') {
                select15(val2_2, val4)
                return;
            }
            select3(val2_2);
            return;
        }
        if (val3 != '请选择') {
            if (val4 != '请选择') {
                select18(val3, val4)
                return;
            }
            select4(val3);
            return;
        }
        if (val4 != '请选择') {
            select5(val4);
            return;
        }
    }
    goSelect();

    showTable(newData)
})

$('.lm_top_reset').on('click', function () { //重置输入
    $('.lm_top input').val('');
    $('.lm_top select').val('');
})