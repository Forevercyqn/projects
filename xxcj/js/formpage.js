// 存取数据
$('.input-text').focusout(function () {

    $(".pub-form").data("text", $(this).val())
    console.log($(".pub-form").data());
})

$(".open-way").on("change", function () {
    var state = $(this).prop("checked");
    $(".pub-form").data("open-way", state);
    console.log($(".pub-form").data());
})


$(".share").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("share", state)
    console.log($(".pub-form").data())
})
$(".start").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("start", state)
    console.log($(".pub-form").data())
})
$(".stop").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("stop", state)
    console.log($(".pub-form").data())
})

$(".from-word").on("change", function () {
    var state = $(this).val()
    $('.pub-form').data("from-word", state)
    console.log($(".pub-form").data())
})

$(".from-word").on("change", function () {
    var state = $(this).val()
    $('.pub-form').data("from-word", state)
    console.log($(".pub-form").data())
})

$(".fall-in").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("fall-in", state)
    console.log($(".pub-form").data())
})

$(".alter").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("alter", state)
    console.log($(".pub-form").data())
})

$(".detele").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("detele", state)
    console.log($(".pub-form").data())
})

$(".user-in").on("change", function () {
    var state = $(this).prop("checked");
    $('.pub-form').data("user-in", state)  
    console.log($(".pub-form").data())
})
$("#submit").on("click",function(){
    let data = {
        form_name:$(".form_name").val(),
        submit_descrip:$(".from-word").val(),
        data:final_json
    };
    $.ajax({
        type:"post",
        url:"/application/createform/index",
        data:data,
        success:function(e){
            console.log(e)
        }
    });
});