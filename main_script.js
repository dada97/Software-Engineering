
var last_click_time;
var body_obj;
var aside_obj;
var section_obj;
var nav_obj;
var user_name;
var limit_time = 10;
var is_logout = false;
var is_online = false;
var token;
var Account_Data;
var now_board_id;

window.onload = function () {
    send_token();
   
    aside_obj = document.getElementById('aside');
    section_obj = document.getElementById('section');
    nav_obj = document.getElementById('nav'); 

   
    var userAgent = navigator.userAgent;

    //顯示search
    $('#Search-block').find("input[name='friend_search']").css('display','block');
    get_board();
    get_group();
   
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
            document.location.href = "index.html";
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
    }
    else if(Account_Data.gender == 'F')
    {
        console.log('女');
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
           
            $('#update_password_view').css('display','none');
            alert("帳號資訊更新成功");
            document.location.href = "main.html";  
        },
        error: function(data){
            alert("帳號資訊更新失敗");
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
            console.log(AllArticle)
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

    for(var i = 0 ; i < 10; i++){

        if(AllArticle.length == 0)
                 break;
        else if(AllArticle.length > 10)
            max_random = 10;
        else
            max_random =  AllArticle.length;

       // var random_number = Math.floor((Math.random() * max_random));
        Article_ID =  AllArticle[0].ID;
        Article_content = AllArticle[0].content;
        Article_User_ID = AllArticle[0].userid;

        var sex_url;  
        var gender = AllArticle[0].gender;      
        var username = AllArticle[0].username;
        var likes = AllArticle[0].likes;
        var liked_text;

        if( AllArticle[0].liked == true)
        liked_text = '已按讚';
        else
        liked_text = '讚';

        if(gender == 'M')
        sex_url = "http://140.118.127.93:8080/SE/images/boy.png"
        else
        sex_url = "http://140.118.127.93:8080/SE/images/girl.png"

        
      
        //AllArticle.splice(random_number, 1);
         AllArticle.splice(0, 1);
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
                   '<div class="article-name" name="username">'+ username  +'</div>'+
               '</div>'+  edit_and_delete_obj +                
           '</div>'+
           
       '<div class="article-main">'+                
       Article_content +     //文章內容
       '</div>'+ 
       edit_input_boj +
       '<div class="article-news"><i class="far fa-thumbs-up"></i> <span class="mag-l-10">'+
       likes + //案讚人數
       '</span></div>'+
   
       '<div class="article-footer">'+
            '<div class="article-footer-button nice-b"><i class="far fa-thumbs-up"></i><span class="mag-l-10">'+ liked_text +'</span></div>'+
            '<div class="article-footer-button message-b"><i class="far fa-comment"></i><span class="mag-l-10">我要留言</span></div>'+
           '<div class="article-line"></div>'+
       '</div>' +            
   '</div>';
   
       $('#Article_list').append(articele_obj);
     
    }
}

//案讚
$("#section").on('click', ".nice-b", function () { 

    var article_obj = $(this).parents('.article');
    var articleid =  $(this).parents('.article').attr("articleid");
    console.log('like' + articleid);//getarticleid
    //getlike(this);
    
    $.ajax({
        url: 'like/' + articleid,
        method: 'post',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            article_obj.find('.nice-b').find('span').text('已按讚');
            var like_count = article_obj.find('.article-news').find('span').text();
            like_count++;
            article_obj.find('.article-news').find('span').text('');
            article_obj.find('.article-news').find('span').text(like_count);
           // getlike(this);
          //  alert('案讚success'); 
        },
        error: function(data){
          //  alert('案讚失敗');         
        }
    });
   
});

async function getlike(articleid)
{
    let likes;
    $.ajax({
        url: 'like/' + articleid,
        method: 'get',
        success: function (data) {
            likes = data.likes;
            console.log(likes)  
            return likes;      
        },
        error: function(data){
            alert('getlike失敗');         
        }
    });  
}
/*
function getlike(like_obj){

    $this = $(like_obj);
    var articleid =  $this.parents('.article').attr("articleid");
    
   
}*/

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
            comments[i].content =  comments[i].content.replace(new RegExp("\n", "gm"), '<br/>');
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
var last_message_time;
//新增留言
function enter_submit(textarea_obj){

    if (event.which == 13 || event.keyCode == 13 || event.whitch == 13)//whitch ie
    {             
        var articleid = $(textarea_obj).parents('.article').attr("articleid"); 
        var $article_article_line_obj =  $(textarea_obj).parents('.article').find(".article-line");  
        var content = $(textarea_obj).val();
        $(textarea_obj).val('');

        if(content.toUpperCase().indexOf('<') != -1)
                     return;
        var timer1 = new Date();

        
       if(timer1.getTime() - last_message_time < 3000)
                          return;

        var jsonStr = JSON.stringify({
            content: content
        })

        console.log('articleid : ' + articleid + ' content : ' + content);

        $.ajax({
            url: 'comment/' + articleid,
            method: 'POST',
            dataType: 'json',
            async: true,
            contentType: 'application/json',    
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: jsonStr,
    
            success: function (data) { 
                   
                var timer = new Date();
                last_message_time = timer.getTime();
                content = content.replace(new RegExp("\n", "gm"), '<br/>');
                var message_obj = '<div class="article-message">'+
                '<div class="name">'+ Account_Data.username +'</div>' +
                '<div class="message">'+ content +'</div>' +
                '</div>';
   
                $article_article_line_obj.append(message_obj);
               
            },
            error: function(data){
               // alert('留言失敗');         
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

    if(Article_Text.toUpperCase().indexOf('<') != -1)
            return;
            
    var input_name =  $('#Article_input').attr("name");

    if(input_name == 'article')
    {
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

                $.ajax({
                    url: 'article/friend/token',
                    method: 'GET',
                    beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
                    success: function (data) {
                        $('#Article_list').html('');
                        AllArticle = data.articles
                        console.log(AllArticle)
                        dispaly_Article();
                    },
                    error: function(data){
                       console.log("get_AllArticlebyfriend error");
                    }
                });                  
            },
            error: function(data){
                alert('發文失敗');         
            }
        });   
    }
    else if (input_name == 'board'){

        var jsonStr = JSON.stringify({
            content: Article_Text,
            boardid : now_board_id
        })

        
        $.ajax({
            url: 'article/',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: jsonStr,
    
            success: function (data) {
        
            //GET 
               $.ajax({
                   url: 'article/board/' + now_board_id,
                   method: 'GET',
                   beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
                   success: function (data) {
                       $('#Article_list').html('');
                       AllArticle = data.articles;
                       console.log(AllArticle);
                       dispaly_Article();
                   },
                   error: function(data){
                       console.log("get board error");
                    }
               });

                             
            },
            error: function(data){
                alert('發文失敗');         
            }
        });   
    }
    else if (input_name == 'group'){
        
        var jsonStr = JSON.stringify({
            content: Article_Text,
            groupid : now_group_id
        })
      
        $.ajax({
            url: 'article/',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
            data: jsonStr,
    
            success: function (data) {
        
            //GET 
               $.ajax({
                   url: 'article/group/' + now_group_id,
                   method: 'GET',
                   beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
                   success: function (data) {
                       $('#Article_list').html('');
                       AllArticle = data.articles;
                       console.log(AllArticle);
                       dispaly_Article();
                   },
                   error: function(data){
                       console.log("get group error");
                    }
               });

                             
            },
            error: function(data){
                alert('發文失敗');         
            }
        });   

    }

    $('#Article_input').val('');
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
    console.log( $(this).parents('.article').find(".article-main"))
    $.ajax({
        url: 'article/' + articleid,
        method: 'put',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: jsonStr,

        success: function (data) {
           
            content = content.replace(new RegExp("\n", "gm"), '<br/>');
            $article_main.text(content);           
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
              var gender = myfriends[i].gender;
              var sex_url;
             // console.log(myfriends[i].gender)
              if(gender == 'M')
              sex_url = "http://140.118.127.93:8080/SE/images/boy.png"
              else
              sex_url = "http://140.118.127.93:8080/SE/images/girl.png"
      

              var friend_obj = '<div class="friend" friendid="'+ myfriends[i].ID+ '">'+
              '<div class="friend-header">' +             
                      '<img class="photo" src="'+ sex_url +'">'+
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

        if(friend_id != Account_Data.ID)
           alert("已經是好友");
        else
            alert("???");
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
    

    var Searchmyfriend;

    $.ajax({
        url: 'friend/token',
        method: 'GET',
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: {},
        success: function (data) {   
            Searchmyfriend = data.friends
        },
        error: function(data){
           console.log("getFriendByAccountId error");
        }
    });

    
    $('#Search-block').find('input').each(function () {
        if ($(this).css('display') == 'block')
        {
           

           if($(this).attr("name") == 'friend_search') {

            var jsonStr = JSON.stringify({
                name: $(this).val(),
            })
            $.ajax({
                url: 'account/search/',
                method: 'post',
                dataType: 'json',
                async: false,
                contentType: 'application/json',              
                data: jsonStr,
                success: function (data) {   
                    var accounts = data.accounts;                    
                    $('#section').html('');
                    
                for(var i = 0 ; i < accounts.length ; i++)
                {
                    var new_friend_obj = '<div class="new-friend-button"><i class="fas fa-user-plus friend-icon"></i></div>';
                    for(var j = 0; j < Searchmyfriend.length ; j ++)
                    {                     
                        if(accounts[i].id == Searchmyfriend[j].ID  ||  accounts[i].id == Account_Data.ID )
                        {
                            
                            new_friend_obj = '';
                            break;
                        }
                    }

                    var sex_url;  
                    var gender = accounts[i].gender;      
                             
                    if(gender == 'M')
                    sex_url = "http://140.118.127.93:8080/SE/images/boy.png"
                    else
                    sex_url = "http://140.118.127.93:8080/SE/images/girl.png"

                    var friend_obj = '<div class="friend" friendid="'+ accounts[i].id +'">' +
                    '<div class="friend-header">' +             
                            '<img class="photo" src="'+  sex_url +'">'+
                             '<div class="friend-title">'+
                                '<div class="friend-name" name="username">'+ accounts[i].username +'</div>'+
                                //'<div class="friend-count" name="">153名好友</div>'+
                            '</div>'+                    
                        '</div>'+
                        new_friend_obj +
                        
                '</div>';
                
                $('#section').append(friend_obj);
                }
                    console.log("搜尋成功");
                },
                error: function(data){
                    console.log("搜尋無此結果");
                 }
            });        

           }
           else if($(this).attr("name") == 'title_search'){
                console.log('title_search')
           } else if($(this).attr("name") == 'group_search'){
            console.log('group_search')
           }
            return;
        }   
    });
});


var boards;
function get_board(){//ok
   
    $.ajax({
        url: 'board/',
        method: 'GET',
        success: function (data) {
            boards = data.boards;                                                                   
            for(var i=0 ; i < boards.length ; i++)
            {
                var board_obj = '<li><div ><i class="fas_control_right"></i><a board_id="'+ boards[i].ID +'" class="board-button">'+ boards[i].boardname+'</a></div></li>'
                $('#Board').append(board_obj);
            }
        },
        error: function(data){
            console.log("board error");
         }
    });
}


$("#aside").on('click', ".board-button", function () {
    $this =$(this);
     now_board_id  = $this.attr("board_id");
   
    $('#Search-block').find("input[name='title_search']").css('display','block');
    $('#Search-block').find("input[name='friend_search']").css('display','none');   
    $('#Search-block').find("input[name='group_search']").css('display','none');
    $('#Article_list').html('');
    $('#Article_input').attr('name','board');
    
    console.log('board_id : ' + now_board_id )

    $.ajax({
        url: 'article/board/' + now_board_id,
        method: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        success: function (data) {
            AllArticle = data.articles;
            console.log(AllArticle);
            dispaly_Article();
        },
        error: function(data){
            console.log("get board error");
         }
    });
});


function get_group()
{
    $.ajax({
        url: 'group/token',
        method: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },     
        success: function (data) {
            groups = data.groups;    
            console.log(groups);                                                               
            for(var i=0 ; i <  groups.length ; i++)
            {
                console.log(groups[i]); 
                var  groups_obj = '<li><div ><i class="fas_control_right"></i><a group_id="'+  groups[i].groupID +'" class="group-button">'+  groups[i].groupname+'</a></div></li>'
                $('#Group').append(groups_obj);
            }
        },
        error: function(data){
            console.log("groups error");
         }
    });
}

function group_input(input)
{
    if (event.which == 13 || event.keyCode == 13 || event.whitch == 13)//whitch ie
    {             
        $this = $(input);
        console.log($this.val())

        var jsonStr = JSON.stringify({          
            groupname: $this.val()
        })

        $.ajax({
            url: 'group/',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json', 
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },             
            data: jsonStr,
            success: function (data) {   
                document.location.href = "index.html";
            },
            error: function(data){
                console.log("has group");
             }
        });        

        $this.val('')
    }
    
}

var now_group_id;
$("#aside").on('click', ".group-button", function () {
    $this =$(this);
    now_group_id  = $this.attr("group_id");
   
    $('#Search-block').find("input[name='group_search']").css('display','block');
    $('#Search-block').find("input[name='title_search']").css('display','none');
    $('#Search-block').find("input[name='friend_search']").css('display','none');   
   
    $('#Article_list').html('');
    $('#Article_input').attr('name','group');
    
    console.log('group_id : ' + now_group_id )

    $.ajax({
        url: 'article/group/' + now_group_id,
        method: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },  
        success: function (data) {
            AllArticle = data.articles;
            console.log(AllArticle);
            dispaly_Article();
        },
        error: function(data){
            console.log("get group error");
         }
    });
});