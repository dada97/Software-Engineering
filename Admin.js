
var pages = $("[name='page']");


window.onload = function () {
    for (i = 0; i < pages.length; i++)
       pages[i].style.display = 'none';
}

function re_size() {

}

function user_edit_submit(user_edit_submit) {
    var $user_edit_submit = $(user_edit_submit);
    var $The_user_list = $user_edit_submit.parents("ul.trstyle");
   // console.log($user_edit_submit.parents("ul.trstyle").find("[name='password']"));
    var user_name = $The_user_list.find("[name='user']").text();
    var password = $The_user_list.find("input[name='password']").val();
    console.log(user_name);
    console.log(password);

     $.ajax({
        url: '',
        method: 'POST',
        dataType: 'json',
        data: '&user=' + user_name + '&password=' + password,

        success: function (obj) {
            if (obj.message === "yes") {
                alert('更改成功');
                $The_user_list.find("[name='password']").text(password);

                //顯示更改後密碼
                var password_input = $The_user_list.children("li[name='password_input']")[0];
                var password_view = $The_user_list.children("li[name='password']")[0];
                var edit_button = $The_user_list.find(".edit_button")[0];
                password_input.style.display = 'none';
                edit_button.style.display = 'none';
                password_view.style.display = 'inline-block';
            }
            else {
                alert(obj.message);  //若錯誤則印出錯誤訊息
            }
        },
    });
}

function user_edit(user_edit_button) {
    var The_user_list = user_edit_button.parentElement.parentElement;
    var $The_user_list = $(The_user_list); //轉成jquery 
    var password_input = $The_user_list.children("li[name='password_input']")[0];
    var password_view = $The_user_list.children("li[name='password']")[0];
    var edit_button = $The_user_list.find(".edit_button")[0];


    console.log(edit_button);
    if (password_input.style.display == 'none') {
        password_input.style.display = 'inline-block';
        edit_button.style.display = 'inline-block';
        password_view.style.display = 'none';
    }
    else {
        password_input.style.display = 'none';
        edit_button.style.display = 'none';
        password_view.style.display = 'inline-block';
    }
}

function user_delete(user_delete_button) {
    var $jquery_user_delete_button = $(user_delete_button); 
    var $The_user_list = $jquery_user_delete_button.parents("ul.trstyle");
    var user_name = $The_user_list.find("[name='user']").text();
    var flag = confirm('確認要刪除？');

    if (flag) {
        $.ajax({
            url: 'user_delete.aspx',
            method: 'POST',
            dataType: 'json',
            data: '&user=' + user_name,
            success: function (obj) {
                if (obj.massage === "yes") {

                    $The_user_list.remove();
                    alert('刪除成功');
                }
            },
        });
    }
}

$("[name='page_button']").click(function () {
    
    for (i = 0; i < pages.length; i++) {
       
        if (pages[i].attributes["page_tag"].value != this.attributes["page_tag"].value)
            pages[i].style.display = 'none';
        else
            pages[i].style.display = 'block';
    }

    if (this.attributes["page_tag"].value == "user_management") {//user管理
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'json',
            data: {},
            success: function (obj) {
                $('#UserList').html("");

                for (var i = 0; i < obj.data_count; i++) {
                    var string = '<ul class="trstyle">' +
                        '<li style="width : 5%">#' + (i + 1) + '</li>' +
                        '<li class="create_date" style = "width : 20%">2018-1-3</li>' +
                        '<li name="user" style="width : 20%">' + obj.user_data[i] + ' </li>' +
                        '<li name="password" style="width : 20%">' + obj.password_data[i] + '</li>' +
                        '<li name="password_input" style="width : 20% ; display :none"><input class="form-control user_p_up" type="text" name="password" placeholder="密碼" /></li>' +
                        '<li name="user_management" style="width : 30%">' +
                        '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
                        '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
                        '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i> Edit</div>' +
                        '</li></ul>';

                    $('#UserList').append(string);
                }

            },
        });
    }
});

$('#user_update_submit').click(function () {
    if ($('#user_update_submit').val() == "false")
        return false;
    else
        $('#user_update_submit').val("false");

    $.ajax({
        url: '',
        method: 'POST',
        dataType: 'json',
        data: $('#user_update_form').serialize(),
        success: function (obj) {

            if (obj.success === "yes") {
                alert('新增成功');
            }
            else {
                alert(obj.success);  //若錯誤則印出錯誤訊息
            }
            $('#user_update_submit').val("true");
        },
    });

    return false;
});

