var Users = [];
Users[0]={ username: "1230" ,account : "fuck0",password:"you0",gender:"1"};
Users[1]={ username: "1231" ,account : "fuck1",password:"you1",gender:"2"};
Users[2]={ username: "1232" ,account : "fuck2",password:"you2",gender:"1"};
Users[3]={ username: "1233" ,account : "fuck3",password:"you3",gender:"2"};
Users[4]={ username: "1234" ,account : "fuck4",password:"you4",gender:"1"};
Users[5]={ username: "1235" ,account : "fuck5",password:"you5",gender:"2"};
Users[6]={ username: "1236" ,account : "fuck6",password:"you6",gender:"1"};
Users[7]={ username: "1237" ,account : "fuck7",password:"you7",gender:"2"};
Users[8]={ username: "1238" ,account : "fuck8",password:"you8",gender:"1"};
var pages = $("[name='page']");

var token;
/**隱藏所有看板 */
window.onload = function () {
    for (i = 0; i < pages.length; i++)
       pages[i].style.display = 'none';
    token = getCookie('token');
}
/**取得Cookie Token */
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
/**發送修改用戶資料 */
function user_edit_submit(user_edit_submit) {
    var $The_user_list =$(user_edit_submit.parentElement);
    var username = $The_user_list.find("input[name='username']").val();
    var ID = $The_user_list.find("li[name='ID']").text();
    var account = $The_user_list.find("li[name='account']").text();
    var password = $The_user_list.find("input[name='password']").val();
    var gender = $The_user_list.find("select[name='gender']").val();

    var jsonStr = JSON.stringify({
        username: username,
        account: account,
        password: password,
        gender:gender
    });
     $.ajax({
        url: 'account/' + ID,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,
        success: function (obj) {
            alert('更改成功');
            $The_user_list.find("[name='username']").text(username);
            $The_user_list.find("[name='gender']").text(gender);
            //顯示更改後密碼
            var username_input = $The_user_list.children("li[name='username_input']")[0];
            var username_view = $The_user_list.children("li[name='username']")[0];
            var gender_input = $The_user_list.children("li[name='gender_input']")[0];
            var gender_view = $The_user_list.children("li[name='gender']")[0];
            var password_input = $The_user_list.children("li[name='password_input']")[0];

            username_input.style.display = 'none';
            username_view.style.display = 'inline-block';
            password_input.style.display = 'none';
            gender_input.style.display = 'none';
            gender_view.style.display = 'inline-block';

            var edit_button = $The_user_list.find(".edit_button")[0];
            edit_button.style.display = 'none';
            resetUserList();
        },
        error:function(error){
            alert(error);
        }
    });
}
/**按下修改資料按鈕切換Input */
function user_edit(user_edit_button) {
    var $The_user_list = $(user_edit_button.parentElement);

    var username_input = $The_user_list.children("li[name='username_input']")[0];
    var username_view = $The_user_list.children("li[name='username']")[0];
    var gender_input = $The_user_list.children("li[name='gender_input']")[0];
    var gender_view = $The_user_list.children("li[name='gender']")[0];
    var password_input = $The_user_list.children("li[name='password_input']")[0];

    var edit_button = $The_user_list.find(".edit_button")[0];

    console.log(edit_button);
    if (password_input.style.display == 'none') {
        username_input.style.display = 'inline-block';
        username_view.style.display = 'none';
        password_input.style.display = 'inline-block';
        gender_input.style.display = 'inline-block';
        gender_view.style.display = 'none';

        edit_button.style.display = 'inline-block';
    }
    else {
        username_input.style.display = 'none';
        username_view.style.display = 'inline-block';
        password_input.style.display = 'none';
        gender_input.style.display = 'none';
        gender_view.style.display = 'inline-block';

        edit_button.style.display = 'none';
    }
}
/**刪除用戶 */
function user_delete(user_delete_button) {
    var $The_user_list = $(user_delete_button.parentElement);
    var ID = $The_user_list.find("li[name='ID']").text();
    var flag = confirm('確認要刪除？');

    if (flag) {
        console.log(ID)
        $.ajax({
            url: 'account/'+ID,
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
/**重新取得用戶列表 */
function resetUserList(){
         $.ajax({
            url: 'account/',
            method: 'GET',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: {},
            success: function (Users) {
                console.log(Users)
                $('#UserList').html("");
                for (var i = 0; i < Users.accounts.length; i++) {
                    var genderN;
                    Users.accounts[i].gender=='M'?genderN="男":genderN="女";
                    console.log(Users.accounts[i])
                    var string = '<ul class="trstyle">' +
                        '<li style="width : 5%">#' + (i + 1) + '</li>' +
                        '<li name="username" style = "width : 15%">'+ Users.accounts[i].username +' </li>' +
                        '<li name="username_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="username" placeholder="使用者名稱" /></li>' +
                        '<li name="account" style="width : 15%">' + Users.accounts[i].account + ' </li>' +
                        '<li name="password_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="password" placeholder="密碼" /></li>' +
                        '<li name="gender" style="width : 5%">' + genderN + '</li>' +
                        '<li name="gender_input" style="width : 5% ; display :none"><select class="select-style" name="gender"> <option value="1">男生</option> <option value="2">女生</option> </select></li>' +
                        '<li name="user_management" style="width : 35%">' +
                        '<li name="ID" style="display:none">' + Users.accounts[i].ID + '</li>' +
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
        var genderN;
        Users[i].gender==1?genderN="男":genderN="女";

        var string = '<ul class="trstyle">' +
            '<li style="width : 5%">#' + (i + 1) + '</li>' +
            '<li name="username" style = "width : 15%">'+ Users[i].username +' </li>' +
            '<li name="username_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="username" placeholder="username" /></li>' +
            '<li name="account" style="width : 15%">' + Users[i].account + ' </li>' +
            '<li name="password" style="width : 15%">' + Users[i].password + '</li>' +
            '<li name="password_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="password" placeholder="密碼" /></li>' +
            '<li name="gender" style="width : 5%">' + genderN + '</li>' +
            '<li name="gender_input" style="width : 15% ; display :none"><select class="select-style" name="gender"> <option value="1">男生</option> <option value="2">女生</option> </select></li>' +
            '<li name="user_management" style="width : 35%">' +
            '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
            '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
            '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i>Edit</div>' +
            '</li></ul>';

        $('#UserList').append(string);
    } */
}


/**發送修改家族資料 */
function group_edit_submit(group_edit_submit) {
    var $The_group_list =$(group_edit_submit.parentElement);
    var groupname = $The_group_list.find("input[name='groupname']").val();
    var ID = $The_group_list.find("li[name='ID']").text();

    var jsonStr = JSON.stringify({
        groupname: groupname,//JSON修改此處
    });
     $.ajax({
        url: 'group/' + ID,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,
        success: function (obj) {
            alert('更改成功');
            $The_group_list.find("[name='groupname']").text(groupname);

            var groupname_input = $The_group_list.children("li[name='groupname_input']")[0];
            var groupname_view = $The_group_list.children("li[name='groupname']")[0];

            groupname_input.style.display = 'none';
            groupname_view.style.display = 'inline-block';

            var edit_button = $The_group_list.find(".edit_button")[0];
            edit_button.style.display = 'none';
            resetGroupList();
        },
        error:function(error){
            alert(error);
        }
    });
}
/**按下修改資料按鈕切換Input */
function group_edit(group_edit_button) {
    var $The_group_list = $(group_edit_button.parentElement);

    var groupname_input = $The_group_list.children("li[name='groupname_input']")[0];
    var groupname_view = $The_group_list.children("li[name='groupname']")[0];

    var edit_button = $The_group_list.find(".edit_button")[0];

    console.log(edit_button);
    if (password_input.style.display == 'none') {
        groupname_input.style.display = 'inline-block';
        groupname_view.style.display = 'none';

        edit_button.style.display = 'inline-block';
    }
    else {
        groupname_input.style.display = 'none';
        groupname_view.style.display = 'inline-block';

        edit_button.style.display = 'none';
    }
}
/**刪除家族 */
function group_delete(group_delete_button) {
    var $The_group_list = $(group_delete_button.parentElement);
    var ID = $The_group_list.find("li[name='ID']").text();
    var flag = confirm('確認要刪除？');

    if (flag) {
        console.log(ID)
        $.ajax({
            url: 'group/'+ID,
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: {},
            success: function (obj) {
                resetGroupList();
                alert('刪除成功');
            },
            error: function(obj){
                alert('刪除失敗');
             }
        });
    }
}
/**重新取得家族列表 */
function resetGroupList(){
    $.ajax({
       url: 'group/',
       method: 'GET',
       beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
       data: {},
       success: function (Groups) {//修改Groups格式
           $('#GroupList').html("");
           for (var i = 0; i < Groups.groups.length; i++) {
               var string = '<ul class="trstyle">' +
                   '<li style="width : 5%">#' + (i + 1) + '</li>' +
                   '<li name="groupname" style = "width : 15%">'+ Groups.groups[i].groupname +' </li>' +
                   '<li name="groupname_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="groupname" placeholder="家族名稱" /></li>' +
                   '<li name="user_management" style="width : 35%">' +
                   '<li name="ID" style="display:none">' + Groups.groups[i].ID + '</li>' +
                   '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
                   '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
                   '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i>Edit</div>' +
                   '</li></ul>';

               $('#GroupList').append(string);
           }
         
       },
       error:function(error){
           alert("獲取家族資訊失敗");
       }
   }); 

}


/**發送修改看板資料 */
function board_edit_submit(board_edit_submit) {
    var $The_board_list =$(board_edit_submit.parentElement);
    var boardname = $The_board_list.find("input[name='boardname']").val();
    var ID = $The_board_list.find("li[name='ID']").text();

    var jsonStr = JSON.stringify({
        boardname: boardname,//JSON修改此處
    });
     $.ajax({
        url: 'board/' + ID,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,
        success: function (obj) {
            alert('更改成功');
            $The_board_list.find("[name='boardname']").text(boardname);

            var boardname_input = $The_board_list.children("li[name='boardname_input']")[0];
            var boardname_view = $The_board_list.children("li[name='boardname']")[0];

            boardname_input.style.display = 'none';
            boardname_view.style.display = 'inline-block';

            var edit_button = $The_board_list.find(".edit_button")[0];
            edit_button.style.display = 'none';
            resetboardList();
        },
        error:function(error){
            alert(error);
        }
    });
}
/**按下修改資料按鈕切換Input */
function board_edit(board_edit_button) {
    var $The_board_list = $(board_edit_button.parentElement);

    var boardname_input = $The_board_list.children("li[name='boardname_input']")[0];
    var boardname_view = $The_board_list.children("li[name='boardname']")[0];

    var edit_button = $The_board_list.find(".edit_button")[0];

    console.log(edit_button);
    if (password_input.style.display == 'none') {
        boardname_input.style.display = 'inline-block';
        boardname_view.style.display = 'none';

        edit_button.style.display = 'inline-block';
    }
    else {
        boardname_input.style.display = 'none';
        boardname_view.style.display = 'inline-block';

        edit_button.style.display = 'none';
    }
}
/**刪除看板 */
function board_delete(board_delete_button) {
    var $The_board_list = $(board_delete_button.parentElement);
    var ID = $The_board_list.find("li[name='ID']").text();
    var flag = confirm('確認要刪除？');

    if (flag) {
        console.log(ID)
        $.ajax({
            url: 'board/'+ID,
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: {},
            success: function (obj) {
                resetBoardList();
                alert('刪除成功');
            },
            error: function(obj){
                alert('刪除失敗');
             }
        });
    }
}
/**重新取得看板列表 */
function resetBoardList(){
    $.ajax({
       url: 'board/',
       method: 'GET',
       beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
       data: {},
       success: function (Boards) {//修改Boards格式
           $('#BoardList').html("");
           for (var i = 0; i < Boards.boards.length; i++) {
               var string = '<ul class="trstyle">' +
                   '<li style="width : 5%">#' + (i + 1) + '</li>' +
                   '<li name="boardname" style = "width : 15%">'+ Boards.boards[i].boardname +' </li>' +
                   '<li name="boardname_input" style="width : 15% ; display :none"><input class="form-control user_p_up" type="text" name="boardname" placeholder="看板名稱" /></li>' +
                   '<li name="user_management" style="width : 35%">' +
                   '<li name="ID" style="display:none">' + Boards.boards[i].ID + '</li>' +
                   '<div onclick=user_edit(this) class="icon_box"><i class="fas fa-edit"></i></div>' +
                   '<div onclick=user_delete(this) class="icon_box"><i class="fas fa-trash-alt"></i></div>' +
                   '<div onclick=user_edit_submit(this) class="edit_button" > <i class="fas fa-plus-square" style="color: white;"></i>Edit</div>' +
                   '</li></ul>';

               $('#BoardList').append(string);
           }
         
       },
       error:function(error){
           alert("獲取家族資訊失敗");
       }
   }); 

}

/**點擊用戶列表時觸發 */
$("[name='page_button']").click(function () {
    
    for (i = 0; i < pages.length; i++) {
       
        if (pages[i].attributes["page_tag"].value != this.attributes["page_tag"].value)
            pages[i].style.display = 'none';
        else
            pages[i].style.display = 'block';
    }

    if (this.attributes["page_tag"].value == "user_management")//user管理
        resetUserList();  
    else if(this.attributes["page_tag"].value == "group_management")
        resetGroupList();
    else if(this.attributes["page_tag"].value == "board_management")
        resetBoardList();
});

/**點擊新增用戶時觸發 */
$('#user_add_submit').click(function () {
    if ($('#user_add_submit').val() == "false")
        return false;
    else
        $('#user_add_submit').val("false");

    var username = $('#user_add_form').find("input[name='username']").val();
    var account = $('#user_add_form').find("input[name='account']").val();
    var password = $('#user_add_form').find("input[name='password']").val();
    var gender = $('#select_gender').val();
    
    var jsonStr = JSON.stringify({
        username: username,
        account: account,
        password: password,
        gender:gender
    });

    $.ajax({
        url: 'account/register',
        method: 'POST',
        dataType: 'json',
        data: jsonStr,           
        contentType: 'application/json',
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
/**點擊新增家族時觸發 */
$('#group_add_submit').click(function () {
    if ($('#group_add_submit').val() == "false")
        return false;
    else
        $('#group_add_submit').val("false");

    var name = $('#group_add_form').find("input[name='name']").val();
    var jsonStr = JSON.stringify({
        name: name,
    });

    $.ajax({
        url: 'group/',
        method: 'POST',
        dataType: 'json',
        data: jsonStr,           
        contentType: 'application/json',
        success: function (obj) {
            alert('新增成功');
            $('#group_add_submit').val("true");
            resetGroupList();
        },
        error: function(obj){
            alert('新增失敗');
            $('#group_add_submit').val("true");
        }
    });

    return false;
});
/**點擊新增看板時觸發 */
$('#board_add_submit').click(function () {
    if ($('#board_add_submit').val() == "false")
        return false;
    else
        $('#board_add_submit').val("false");

    var name = $('#board_add_form').find("input[name='name']").val();
    var jsonStr = JSON.stringify({
        name: name,
    });

    $.ajax({
        url: 'board/',
        method: 'POST',
        dataType: 'json',
        data: jsonStr,           
        contentType: 'application/json',
        success: function (obj) {
            alert('新增成功');
            $('#board_add_submit').val("true");
            resetGroupList();
        },
        error: function(obj){
            alert('新增失敗');
            $('#board_add_submit').val("true");
        }
    });

    return false;
});
