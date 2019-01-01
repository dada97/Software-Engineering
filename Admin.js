var Users = [];
Users[0]={ username: "1230" ,account : "fuck0",password:"you0",sex:"1"};
Users[1]={ username: "1231" ,account : "fuck1",password:"you1",sex:"2"};
Users[2]={ username: "1232" ,account : "fuck2",password:"you2",sex:"1"};
Users[3]={ username: "1233" ,account : "fuck3",password:"you3",sex:"2"};
Users[4]={ username: "1234" ,account : "fuck4",password:"you4",sex:"1"};
Users[5]={ username: "1235" ,account : "fuck5",password:"you5",sex:"2"};
Users[6]={ username: "1236" ,account : "fuck6",password:"you6",sex:"1"};
Users[7]={ username: "1237" ,account : "fuck7",password:"you7",sex:"2"};
Users[8]={ username: "1238" ,account : "fuck8",password:"you8",sex:"1"};
var pages = $("[name='page']");

var token;

window.onload = function () {
    token = getCookie('token');

    for (i = 0; i < pages.length; i++)
       pages[i].style.display = 'none';
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return "";
}

function user_edit_submit(user_edit_submit) {
    var The_user_list =user_edit_submit.parentElement.parentElement;
    var $The_user_list = $(The_user_list);
    var username = $The_user_list.find("input[name='username']").val();
    var account = $The_user_list.find("li[name='account']").text();
    var password = $The_user_list.find("input[name='password']").val();
    var sex = $The_user_list.find("select[name='sex']").val();

    var jsonStr = JSON.stringify({
        username: username,
        account: account,
        password: password,
        sex:sex
    });
     $.ajax({
        url: 'account/' + account,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,
        success: function (obj) {
            alert('更改成功');
            $The_user_list.find("[name='password']").text(password);
            $The_user_list.find("[name='username']").text(username);
            $The_user_list.find("[name='sex']").text(sex);
            //顯示更改後密碼
            var username_input = $The_user_list.children("li[name='username_input']")[0];
            var username_view = $The_user_list.children("li[name='username']")[0];
            var sex_input = $The_user_list.children("li[name='sex_input']")[0];
            var sex_view = $The_user_list.children("li[name='sex']")[0];
            var password_input = $The_user_list.children("li[name='password_input']")[0];
            var password_view = $The_user_list.children("li[name='password']")[0];

            username_input.style.display = 'none';
            username_view.style.display = 'inline-block';
            password_input.style.display = 'none';
            password_view.style.display = 'inline-block';
            sex_input.style.display = 'none';
            sex_view.style.display = 'inline-block';

            var edit_button = $The_user_list.find(".edit_button")[0];
            edit_button.style.display = 'none';
            resetUserList();
        },
        error:function(error){
            alert(error);
        }
    });
}

function user_edit(user_edit_button) {
    var The_user_list = user_edit_button.parentElement.parentElement;
    var $The_user_list = $(The_user_list); //轉成jquery 
    var username_input = $The_user_list.children("li[name='username_input']")[0];
    var username_view = $The_user_list.children("li[name='username']")[0];
    var sex_input = $The_user_list.children("li[name='sex_input']")[0];
    var sex_view = $The_user_list.children("li[name='sex']")[0];
    var password_input = $The_user_list.children("li[name='password_input']")[0];
    var password_view = $The_user_list.children("li[name='password']")[0];
    var edit_button = $The_user_list.find(".edit_button")[0];

    console.log(edit_button);
    if (password_input.style.display == 'none') {
        username_input.style.display = 'inline-block';
        username_view.style.display = 'none';
        password_input.style.display = 'inline-block';
        password_view.style.display = 'none';
        sex_input.style.display = 'inline-block';
        sex_view.style.display = 'none';

        edit_button.style.display = 'inline-block';
    }
    else {
        username_input.style.display = 'none';
        username_view.style.display = 'inline-block';
        password_input.style.display = 'none';
        password_view.style.display = 'inline-block';
        sex_input.style.display = 'none';
        sex_view.style.display = 'inline-block';

        edit_button.style.display = 'none';
    }
}

function user_delete(user_delete_button) {
    var The_user_list = user_delete_button.parentElement.parentElement;
    var $The_user_list = $(The_user_list);
    var account = $The_user_list.find("[name='account']").text();
    var flag = confirm('確認要刪除？');

    if (flag) {
        $.ajax({
            url: 'account/'+account,
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: {},
            success: function (obj) {
                resetUserList();
                alert('刪除成功');
            },
            error: function(obj){
                alert('刪除失敗');
             }
        });
    }
}

function resetUserList(){
         $.ajax({
            url: 'account/',
            method: 'GET',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: {},
            success: function (Users) {
                $('#UserList').html("");
                for (var i = 0; i < Users.length; i++) {
                    var sexN;
                    Users[i].sex==1?sexN="男":sexN="女";

                    var string = '<ul class="trstyle">' +
                        '<li style="width : 5%">#' + (i + 1) + '</li>' +
                        '<li name="username" style = "width : 15%">'+ Users[i].username +' </li>' +
                        '<li name="username_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="username" placeholder="使用者名稱" /></li>' +
                        '<li name="account" style="width : 15%">' + Users[i].account + ' </li>' +
                        '<li name="password" style="width : 15%">' + Users[i].password + '</li>' +
                        '<li name="password_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="password" placeholder="密碼" /></li>' +
                        '<li name="sex" style="width : 5%">' + sexN + '</li>' +
                        '<li name="sex_input" style="width : 15% ; display :none"><select class="select-style" name="sex"> <option value="1">男生</option> <option value="2">女生</option> </select></li>' +
                        '<li name="user_management" style="width : 35%">' +
                        '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
                        '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
                        '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i>Edit</div>' +
                        '</li></ul>';

                    $('#UserList').append(string);
                }
            },
            error:function(error){
                alert("獲取帳戶資訊失敗");
            }
        }); 
    
    /* $('#UserList').html("");
    for (var i = 0; i < Users.length; i++) {
        var sexN;
        Users[i].sex==1?sexN="男":sexN="女";

        var string = '<ul class="trstyle">' +
            '<li style="width : 5%">#' + (i + 1) + '</li>' +
            '<li name="username" style = "width : 15%">'+ Users[i].username +' </li>' +
            '<li name="username_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="username" placeholder="username" /></li>' +
            '<li name="account" style="width : 15%">' + Users[i].account + ' </li>' +
            '<li name="password" style="width : 15%">' + Users[i].password + '</li>' +
            '<li name="password_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="password" placeholder="密碼" /></li>' +
            '<li name="sex" style="width : 5%">' + sexN + '</li>' +
            '<li name="sex_input" style="width : 15% ; display :none"><select class="select-style" name="sex"> <option value="1">男生</option> <option value="2">女生</option> </select></li>' +
            '<li name="user_management" style="width : 35%">' +
            '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
            '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
            '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i>Edit</div>' +
            '</li></ul>';

        $('#UserList').append(string);
    } */
}

$("[name='page_button']").click(function () {
    
    for (i = 0; i < pages.length; i++) {
       
        if (pages[i].attributes["page_tag"].value != this.attributes["page_tag"].value)
            pages[i].style.display = 'none';
        else
            pages[i].style.display = 'block';
    }

    if (this.attributes["page_tag"].value == "user_management") {//user管理
        resetUserList();  
    }
});

$('#user_add_submit').click(function () {
    if ($('#user_add_submit').val() == "false")
        return false;
    else
        $('#user_add_submit').val("false");

    var username = $('#user_add_form').find("input[name='username']").val();
    var account = $('#user_add_form').find("input[name='account']").val();
    var password = $('#user_add_form').find("input[name='password']").val();
    var sex = $('#select_sex').val();
    
    var jsonStr = JSON.stringify({
        username: username,
        account: account,
        password: password,
        sex:sex
    });

    $.ajax({
        url: 'account/register',
        method: 'POST',
        dataType: 'json',
        data: jsonStr,
        success: function (obj) {

            alert('新增成功');
            $('#user_add_submit').val("true");
            resetUserList();
        },
        error: function(obj){
            alert('新增失敗');
            $('#user_add_submit').val("true");
        }
    });

    return false;
});

