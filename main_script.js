
var last_click_time;
var body_obj;
var aside_obj;
var section_obj;
var nav_obj;
var user_name;
var limit_time = 10;
var is_logout = false;
var is_online = false;
var sex_url = "http://140.118.127.93:8080/SE/images/boy.png";
var token;
var Account_Data;

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
        
            dispaly_Article();
        },
        error: function(data){
           console.log("get_AllArticlebyfriend error");
        }
    });

}


//顯示貼文
function dispaly_Article(){
 
    var Article_content;
    var Article_ID;
    var max_random;
    console.log(AllArticle[0])
    for(var i = 0 ; i < 10 ; i++){
      //  console.log('AllArticle.length :' +  AllArticle.length)
      
        if(AllArticle.length == 0)
                 break;
        else if(AllArticle.length > 10)
            max_random = 10;
        else
            max_random =  AllArticle.length;

        var random_number = Math.floor((Math.random() * max_random));
        Article_ID =  AllArticle[random_number].ID;
        Article_content = AllArticle[random_number].content;
        Article_User_ID = AllArticle[random_number].userid;

        AllArticle.splice(random_number, 1);
       
     //   console.log(Article_ID);
      //  console.log(Article_content);
     //   console.log(random_number);
     Article_content  = Article_content.replace(new RegExp("\n", "gm"), '<br/>');//將所有\n換成<br/>
     var edit_and_delete_obj = '';
    var edit_input_boj = '';
        if(Article_User_ID == Account_Data.ID)
        {
            edit_and_delete_obj = '<div class="article-delete-button"><i class="far fa-trash-alt article-delete-icon"></i></div>'+
            '<div class="article-edit-button"> <i class="far fa-edit article-edit-icon"></i></div>';  
            edit_input_boj = '<textarea class="article-edit-input" placeholder="編輯文章"></textarea>' +
            '<button class="btn btn-lg btn-primary center-block article-edit-submit">送出</button>';    
        }
     

        var articele_obj = '<div class="article" articleid="'+ Article_ID +'">'+
    '<div class="article-header"> '+               
            '<img class="photo" src="'+ sex_url +'">'+           
            '<div class="article-title">'+
                '<div class="article-name" name="username">熊熊</div>'+
                '<div class="article-time" name="username">3分鐘前</div>'+
            '</div>'+  edit_and_delete_obj +                
        '</div>'+
        
    '<div class="article-main">'+                
    Article_content +     //文章內容
    '</div>'+ 
    edit_input_boj +
    '<div class="article-news"><i class="far fa-thumbs-up"></i> <span class="mag-l-10">'+
    '100'+ //案讚人數
    '</span></div>'+

    '<div class="article-footer">'+
         '<div class="article-footer-button nice-b"><i class="far fa-thumbs-up"></i><span class="mag-l-10">棒</span></div>'+
         '<div class="article-footer-button message-b"><i class="far fa-comment"></i><span class="mag-l-10">我要留言</span></div>'+
        '<div class="article-line"></div>'+
    '</div>' +            
'</div>';

    $('#Article_list').append(articele_obj);
    }
}

//案讚
$("#section").on('click', ".nice-b", function () {   
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log('like' + articleid);//getarticleid

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

//顯示留言
$("#section").on('click', ".message-b", function () {//ok
    var articleid =  $(this).parents('.article').attr("articleid");
    var $article_article_line_obj =  $(this).parents('.article').find(".article-line");
    var message_input_obj ='<textarea class="article-message-edit-input" onKeyDown="enter_submit(this)" placeholder="我要留言"></textarea>';

    if($(this).parents('.article').find(".article-message-edit-input").length == 0)
    $article_article_line_obj.after(message_input_obj);

    $.ajax({
        url: 'comment/'+ articleid,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',    
        data: {},

        success: function (data) {
         var comments = data.comments;
         $article_article_line_obj.html('');

         for(var i = 0 ; i < comments.length ; i++)
         {
            var message_obj = '<div class="article-message">'+
            '<div class="name">'+ comments[i].username +'</div>' +
            '<div class="message">'+ comments[i].content+'</div>' +
            '</div>';

            $article_article_line_obj.append(message_obj);
         }         
        },
        error: function(data){
            alert('取得留言失敗');         
        }
    });
   
});
//新增留言
function enter_submit(textarea_obj){

    if (event.which == 13 || event.keyCode == 13 || event.whitch == 13)//whitch ie
    {             
        var articleid = $(textarea_obj).parents('.article').attr("articleid"); 
        var content = $(textarea_obj).val();
        var jsonStr = JSON.stringify({
            content: content
        })
        console.log('articleid : ' + articleid + ' content : ' + content);

        $.ajax({
            url: 'comment/' + articleid,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',    
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: jsonStr,
    
            success: function (data) { 
                $("#section").on('click', ".message-b");                
                alert('留言成功');
            },
            error: function(data){
                alert('留言失敗');         
            }
        });
    }
}
//編輯留言

//刪除留言

//按下編輯顯示編輯輸入
$("#section").on('click', ".article-edit-button", function () {

    var $submit_obj =  $(this).parents('.article').find(".article-edit-submit");
    var $input_obj =  $(this).parents('.article').find(".article-edit-input");
    var $article_main = $(this).parents('.article').find(".article-main");

    if($submit_obj.css("display") == 'none')
    {
        $article_main.css("display","none");
        $submit_obj.css("display","block");
        $input_obj.css("display","block");
    }
    else
    {
        $article_main.css("display","block");
        $submit_obj.css("display","none");
        $input_obj.css("display","none");
    }
});

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
            document.location.href = "main.html";  
            alert('發文成功');          
        },
        error: function(data){
            alert('發文失敗');         
        }
    });

});

//編輯貼文
$("#section").on('click', ".article-edit-submit", function () {   //ok

    var articleid =  $(this).parents('.article').attr("articleid");
    var content = $(this).parents('.article').find(".article-edit-input").val();
    var $submit_obj =  $(this).parents('.article').find(".article-edit-submit");
    var $input_obj =  $(this).parents('.article').find(".article-edit-input");
    var $article_main = $(this).parents('.article').find(".article-main");

    var jsonStr = JSON.stringify({
        content: content
    })

    $.ajax({
        url: 'article/' + articleid,
        method: 'put',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,

        success: function (data) {
            content = content.replace(new RegExp("\n", "gm"), '<br/>');
            $(this).parents('.article').find(".article-main").text(content);           
            $article_main.css("display","block");
            $submit_obj.css("display","none");
            $input_obj.css("display","none");

            alert('編輯文章成功');
        },
        error: function(data){
            alert('編輯文章失敗');         
        }
    });
   
});

//刪除貼文
$("#section").on('click', ".article-delete-button", function () {   //ok
    var article_obj = $(this).parents('.article');
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log('delete' + articleid);//getarticleid

    $.ajax({
        url: 'article/' + articleid,
        method: 'delete',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            article_obj.remove();
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

function get_Friend(){//  ok
  
    $.ajax({
        url: 'friend/token',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: {},

        success: function (data) {   
          myfriends = data.friends
        
          $('#section').html('');

          for(var i = 0 ; i < myfriends.length ; i++)
          {   
              var friend_obj = '<div class="friend" friendid="'+ myfriends[i].ID+ '">'+
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

        },
        error: function(data){
           console.log("getFriendByAccountId error");
        }
    });

}

function dispaly_add_friend(){

}

//新增好友
$("#section").on('click', ".new-friend-button", function () { //ok
    $this =$(this);
    var friend_id  = $this.parents('.friend').attr("friendid");
   console.log('friend/' + friend_id);
    $.ajax({
        url: 'friend/' + friend_id,
        method: 'POST',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            $('#display_friend_button').click();
           // alert("新增好友成功");
        },
        error: function(data){
           // alert("新增好友失敗");
         }
    });
});

//刪除好友
$("#section").on('click', ".delete-friend-button", function () {
    $this =$(this);
    var friend_id  = $this.parents('.friend').attr("friendid");
    console.log('delete friend : ' + friend_id )
    $.ajax({
        url: 'friend/' + friend_id,
        method: 'delete',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            $('#display_friend_button').click()
            //alert("刪除好友成功");
        },
        error: function(data){
           // alert("刪除好友失敗");
         }
    });
});

//顯示好友列表 並且可以刪除
$('#display_friend_button').click(function () { 
    get_Friend();  
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
                    history(0);
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