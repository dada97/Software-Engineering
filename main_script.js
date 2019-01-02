
var last_click_time;
var body_obj;
var aside_obj;
var section_obj;
var nav_obj;
var user_name;
var limit_time = 10;
var is_logout = false;
var is_online = false;
var sex_url = "images/boy.png";
var AllArticle = [];
var token;
AllArticle[0]={ ID: "6" ,context : "666666666666666666"}
AllArticle[1]={ ID: "2" ,context : "context2"}
AllArticle[2]={ ID: "1" ,context : "context3"}
AllArticle[3]={ ID: "2" ,context : "context4"}
AllArticle[4]={ ID: "1" ,context : "context5"}
AllArticle[5]={ ID: "2" ,context : "context6"}
AllArticle[6]={ ID: "1" ,context : "context7"}
AllArticle[7]={ ID: "2" ,context : "context8"}
AllArticle[8]={ ID: "1" ,context : "context9"}
AllArticle[9]={ ID: "2" ,context : "context10"}
AllArticle[10]={ ID: "1" ,context : "context11"}
AllArticle[11]={ ID: "2" ,context : "context12"}
AllArticle[12]={ ID: "1" ,context : "context13"}
AllArticle[13]={ ID: "2" ,context : "context14"}
AllArticle[14]={ ID: "1" ,context : "context15"}
AllArticle[15]={ ID: "2" ,context : "context16"}
AllArticle[16]={ ID: "1" ,context : "context17"}
AllArticle[17]={ ID: "2" ,context : "context18"}
AllArticle[18]={ ID: "1" ,context : "context19"}
AllArticle[19]={ ID: "2" ,context : "context20"}
AllArticle[20]={ ID: "1" ,context : "context21"}
AllArticle[21]={ ID: "2" ,context : "context22"}
AllArticle[22]={ ID: "1" ,context : "context23"}
AllArticle[23]={ ID: "2" ,context : "context24"}
AllArticle[24]={ ID: "1" ,context : "context25"}
AllArticle[25]={ ID: "2" ,context : "context26\n1123"}
var Account_Data;

var myfriends = [];
myfriends[0] ={ ID : '0' ,username : "朋友0" }
myfriends[1] ={ ID : '1' ,username : "朋友1" }

window.onload = function () {
    send_token();
    aside_obj = document.getElementById('aside');
    section_obj = document.getElementById('section');
    nav_obj = document.getElementById('nav'); 

    var timer = new Date();
    last_click_time = timer.getTime();
    var userAgent = navigator.userAgent;

    //顯示search
    $('#Search-block').find("input[name='friend_search']").css('display','block');
   
    dispaly_Article();

  //  $(document).scrollTop() = 0;
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//帳戶相關

function send_token(){//ok
    token = getCookie('token');
    console.log(token);

    $.ajax({
        url: 'account/token',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: {},
        success: function (data) {
          Account_Data = data.account;
          console.log(Account_Data);
          initial();
          get_Friend();
          get_AllArticlebyfriend();
        },
        error: function(data){
            console.log("token error");
         }
    });
}
//初始化 更新性別和名稱
function initial()//ok
{
    $('#Username').text(Account_Data.username);
    user_name = Account_Data.username;
    if(Account_Data.gender == 'M')
    {
        console.log('男');
        sex_url = "images/boy.png";
    }
    else if(Account_Data.gender == 'F')
    {
        console.log('女');
        sex_url = "images/girl.png"
    }
    else
    {
        console.log('人妖?');
    }
}
//得到cookie
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
    return ""
}

//顯示更改帳號密碼的畫面
$('#PassWord_button').click(function () {

    if($('#update_password_view').css('display') == 'none')
    $('#update_password_view').css('display','block');  
    else
    $('#update_password_view').css('display','none');  

});


//更新帳戶
$('#update_data_button').click(function () { 
    var username = $('#update_password_form').find("input[name='username']").val()
    //var accountid =  Account_Data.ID
    var password = $('#update_password_form').find("input[name='password']").val()
    var reconfirm = $('#update_password_form').find("input[name='reconfirm']").val()
   
    if(password != reconfirm)
    {
        alert('密碼再確認錯誤');
        return false;
    }
    else if(username == '' || password =='')
    {
        if(username == '')
        alert('請輸入使用者名稱');
        else if(password == '')
        alert('請輸入密碼');
     
        return false;
    }
    else if(username.length >= 20 || password.length >= 20)
    {       
        alert('帳號密碼輸入過長');
        return false;
    }

    var jsonStr = JSON.stringify({
        username: username,
        password: password
    })


    $.ajax({
        url: 'account/' +  Account_Data.ID,
        method: 'put',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,
        success: function (data) {
            console.log("帳號資訊更新成功");
        },
        error: function(data){
            console.log("帳號資訊更新失敗");
         }
    });


    $('#update_password_form').find("input[name='username']").val('');
    $('#update_password_form').find("input[name='password']").val('');
    $('#update_password_form').find("input[name='reconfirm']").val('');
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//文章相關

//得到所有好友的文章
var AllArticle;
function get_AllArticlebyfriend(){ //not ok

    $.ajax({
        url: 'article/friend/token',
        method: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            AllArticle = data.articles
            console.log('AllArticle');
            console.log(AllArticle);
        },
        error: function(data){
           console.log("get_AllArticlebyfriend error");
        }
    });

}

//發文 新增貼文
$('#Article_submit').click(function () { //ok

    var Article_Text =  $('#Article_input').val();

    var jsonStr = JSON.stringify({
        content: Article_Text
    })

    $.ajax({
        url: 'article/',
        method: 'post',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,

        success: function (data) {
            alert('發文成功');
        },
        error: function(data){
            alert('發文失敗');         
        }
    });

});

//顯示貼文
function dispaly_Article(){
 
    var Article_Context;
    var Article_ID;
    var max_random;
    for(var i = 0 ; i < 10 ; i++){

        if(AllArticle.length == 0)
                 break;
        else if(AllArticle.length > 10)
            max_random = 10;
        else
            max_random =  AllArticle.length;

        var random_number = Math.floor((Math.random() * max_random));
        Article_ID =  AllArticle[random_number].ID;
        Article_Context = AllArticle[random_number].context;
        AllArticle.splice(random_number, 1);
       
       // console.log(Article_ID);
       // console.log(Article_Context);
      //  console.log(random_number);
        Article_Context = Article_Context.replace(new RegExp("\n", "gm"), '<br/>');//將所有\n換成<br/>

        var articele_obj = '<div class="article" articleid="'+ Article_ID +'">'+
    '<div class="article-header"> '+               
            '<img class="photo" src="'+ sex_url +'">'+           
            '<div class="article-title">'+
                '<div class="article-name" name="username">熊熊</div>'+
                '<div class="article-time" name="username">3分鐘前</div>'+
            '</div>'+      
            '<div class="article-edit-button"><i class="far fa-trash-alt article-delete-icon"></i></div>'+
            '<div class="article-delete-button"> <i class="far fa-edit article-edit-icon"></i></div>'+            
        '</div>'+
        
    '<div class="article-main">'+                
    Article_Context +     //文章內容
    '</div>'+

    '<div class="article-news"><i class="far fa-thumbs-up"></i> <span class="mag-l-10">'+
    '100'+ //案讚人數
    '</span></div>'+

    '<div class="article-footer">'+
         '<div class="article-footer-button nice-b"><i class="far fa-thumbs-up"></i><span class="mag-l-10">棒</span></div>'+
         '<div class="article-footer-button message-b"><i class="far fa-comment"></i><span class="mag-l-10">我要留言</span></div>'+
    '</div>' +            
'</div>';

    $('#Article_list').append(articele_obj);

    $('#Article_input').val('');
    }
}

//案讚
$("#section").on('click', ".nice-b", function () {   
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log(articleid);//getarticleid

    $.ajax({
        url: 'like/' + articleid,
        method: 'post',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },

        success: function (data) {
            alert('案讚成功');
        },
        error: function(data){
            alert('案讚失敗');         
        }
    });
   
});

//留言
$("#section").on('click', ".message-b", function () {
    var articleid =  $(this).parents('.article').attr("articleid");
    var $article_footer_obj =  $(this).parents('.article').find(".article-footer");
    var message_obj = '<div class="article-message">'+
    '<div class="name"></div>' +
    '<div class="message"></div>' +
'</div>';
    $article_footer_obj.after(message_obj);

  //  console.log(articleid);//getarticleid
  
    $.ajax({
        url: 'comment/'+ articleid,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',    
        data: {},

        success: function (data) {
         
            alert('取得留言成功');
        },
        error: function(data){
            alert('取得留言失敗');         
        }
    });
   
});


//編輯貼文
$("#section").on('click', ".article-edit-button", function () {   
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log(articleid);//getarticleid
   
    context ='12545465645643';
    var jsonStr = JSON.stringify({
        context: context
    })

    $.ajax({
        url: 'article/' + articleid,
        method: 'put',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,

        success: function (data) {
            alert('編輯文章成功');
        },
        error: function(data){
            alert('編輯文章失敗');         
        }
    });
   
});

//刪除貼文
$("#section").on('click', ".article-delete-button", function () {   
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log(articleid);//getarticleid

   
    $.ajax({
        url: 'article/' + articleid,
        method: 'delete',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            alert('刪除文章成功');
        },
        error: function(data){
            alert('刪除文章失敗');         
        }
    });
   
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//好友相關

var myfriends;
function get_Friend(){// not ok
  
    $.ajax({
        url: 'friend/token',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: {},

        success: function (data) {
          myfriends = data.friends
          console.log('myfriend');
          console.log(myfriends);
        },
        error: function(data){
           console.log("getFriendByAccountId error");
        }
    });

}

function dispaly_add_friend(){

}

//新增好友
$("#section").on('click', ".new-friend-button", function () {
    $this =$(this);
    var friend_id  = $this.parents('.friend').attr("friendid");
   console.log('friend/' + friend_id);
    $.ajax({
        url: 'friend/' + friend_id,
        method: 'POST',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            alert("新增好友成功");
        },
        error: function(data){
            alert("新增好友失敗");
         }
    });
});

//刪除好友
$("#section").on('click', ".delete-friend-button", function () {
    $this =$(this);
    var friend_id  = $this.parents('.friend').attr("friendid");

    $.ajax({
        url: 'friend/' + friend_id,
        method: 'delete',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            alert("刪除好友成功");
        },
        error: function(data){
            alert("刪除好友失敗");
         }
    });
});

//顯示好友列表 並且可以刪除
$('#display_friend_button').click(function () {
    $('#section').html('');


    for(var i = 0 ; i < myfriends.length ; i++)
    {
        var friend_obj = '<div class="friend" friendid="'+ myfriends[i].ID+ '1">'+
        '<div class="friend-header">' +             
                '<img class="photo" src="images/1.jpg">'+
                 '<div class="friend-title">'+
                    '<div class="friend-name" name="username">'+ myfriends[i].username+'</div>'+
                   // '<div class="friend-count" name="">153名好友</div>'+
                '</div>'+                    
            '</div>'+
            '<div class="delete-friend-button">'+
            '<i class="fas fa-user-minus friend-icon"></i>' +                           
            '</div>'+
        '</div>';
        $('#section').append(friend_obj);
    }
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//其他
//登出
$('#Logout_button').click(function () {
    document.location.href = "index.html";
    document.cookie ="token=";   
});

//回到main
$('#Home_button').click(function () {
    document.location.href = "main.html";  
});

//展開
function Expand(form) {

    var form_parent_obj = form.parentElement;
    var form_ul = form_parent_obj.getElementsByTagName('ul');
    var form_parent_ul_obj = form.parentElement.parentElement;
    var $ul_obj = $(form_parent_ul_obj);
    if (form_ul.length != 0) {
     
        if (form_ul[0].style.display != 'block') {
            $ul_obj.find("li ul").css('display', 'none');
            $ul_obj.find("li .fas.fa-angle-up.fas_control_menu").attr('class', 'fas fa-angle-down fas_control_menu');

            var trigon = form_parent_obj.getElementsByClassName('fas fa-angle-down fas_control_menu');
            form_ul[0].style.display = 'block';

            if (trigon.length != 0)
                trigon[0].className = 'fas fa-angle-up fas_control_menu';
        }
        else {
            var trigon = form_parent_obj.getElementsByClassName('fas fa-angle-up fas_control_menu');

            form_ul[0].style.display = 'none';

            if (trigon.length != 0)
                trigon[0].className = 'fas fa-angle-down fas_control_menu';
        }
    }  
}

/*
$('#Topic_button').click(function () {
    $('#aside').css('display','block');
    $('#section').css('visibility','hidden');
    //visible
});*/
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


$(window).scroll(function () {
  
    //讀取新文章
    if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 100) {
        dispaly_Article();
      }
  
});

//搜尋大小再改
function re_size(){
    var Top_sezrch_height;

    $('#Search-block').find('input').each(function () {
        if ($(this).css('display') == 'block')
        {
            Top_sezrch_height = this.offsetHeight;
            console.log(Top_sezrch_height);
            $(this).outerHeight(Top_sezrch_height);
            $('#Search').outerHeight(Top_sezrch_height);
            return;
        }   
    });
}

function keypressInBox() {

    if (event.which == 81 || event.keyCode == 81 || event.whitch == 81)//whitch ie
    {
        console.log('Account_Data');
        console.log(Account_Data);
        console.log('AllArticle');
        console.log(AllArticle); 
        console.log('user_name');
        console.log(user_name);             
    }
}


//搜尋帳戶(好友) (看板) (家族)
$('#Search').click(function () {
    
    $('#Search-block').find('input').each(function () {
        if ($(this).css('display') == 'block')
        {
            $.ajax({
                url: 'account/search/' + $(this).val(),
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',              
                data: {},
                success: function (data) {   
                    
                    var accounts = data.accounts;
                    
                    $('#section').html('');

                for(var i = 0 ; i < accounts.length ; i++)
                {
                    var friend_obj = '<div class="friend" friendid="'+ accounts[i].id +'">' +
                    '<div class="friend-header">' +             
                            '<img class="photo" src="images/1.jpg">'+
                             '<div class="friend-title">'+
                                '<div class="friend-name" name="username">'+ accounts[i].username +'</div>'+
                                //'<div class="friend-count" name="">153名好友</div>'+
                            '</div>'+                    
                        '</div>'+
                        '<div class="new-friend-button">'+
                        '<i class="fas fa-user-plus friend-icon"></i>' +                           
                        '</div>'+
                '</div>';
                
                $('#section').append(friend_obj);
                }
                   
                    console.log("搜尋成功");
                },
                error: function(data){
                    console.log("搜尋無此結果");
                 }
            });        
            return;
        }   
    });
});