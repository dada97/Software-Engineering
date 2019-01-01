
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
AllArticle[0]={ ID: "1" ,context : "context1"}
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
var Account_Data;/*={
    account : "123",
    password : "654",
    username : "兔兔",
    gender : "M"
};*/

window.onload = function () {
    
    aside_obj = document.getElementById('aside');
    section_obj = document.getElementById('section');
    nav_obj = document.getElementById('nav'); 

    var timer = new Date();
    last_click_time = timer.getTime();
    var userAgent = navigator.userAgent;

    //顯示search
    $('#Search-block').find("input[name='friend_search']").css('display','block');
   
    dispaly_Article();
   // initial();
   // get_Friend();
   // get_AllArticlebyfriend();
    send_token();

  //  $(document).scrollTop() = 0;
}

function send_token(){
    var token = getCookie('token');
    //console.log(token);
    $.ajax({
        url: 'account/token',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', token); },
        data: {},
        success: function (data) {
          Account_Data = data.account;
          initial();
          get_Friend();
          get_AllArticlebyfriend();
        },
        error: function(data){
            console.log("token error");
         }
    });
}

function initial()
{
    $('#Username').text(Account_Data[0].username);

    if(Account_Data[0].gender == 'M')
    {
        console.log('男');
        sex_url = "images/boy.png";
    }
    else if(Account_Data[0].gender == 'F')
    {
        console.log('女');
        sex_url = "images/girl.png"
    }
    else
    {
        console.log('人妖?');
    }
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
    return ""
}

var myfriend;
function get_Friend(){

    $.ajax({
        url: 'friend/' + Account_Data.ID,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: {},

        success: function (data) {
          myfriend = data.friends
          console.log('myfriend');
          console.log(myfriend);
        },
        error: function(data){
           console.log("getFriendByAccountId error");
        }
    });

}

var AllArticle;
function get_AllArticlebyfriend(){

    $.ajax({
        url: 'article/friend/'+ Account_Data.ID,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: {},

        success: function (data) {
            AllArticle = data.articles
            console.log('AllArticle');
            console.log(AllArticle);
            //dispaly_Article();
        },
        error: function(data){
           console.log("get_AllArticlebyfriend error");
        }
    });

}

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
        console.log(Article_Context);
        console.log(random_number);
        Article_Context = Article_Context.replace(new RegExp("\n", "gm"), '<br/>');//將所有\n換成<br/>

        var articele_obj = '<div class="article" articleid="'+ Article_ID +'">'+
    '<div class="article-header"> '+               
            '<img class="photo" src="'+ sex_url +'">'+           
            '<div class="article-title">'+
                '<div class="article-name" name="username">熊熊</div>'+
                '<div class="article-time" name="username">3分鐘前</div>'+
            '</div>'+                
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

    
   
   // if($('#Article_input').val() == '')
    //        return false;

    

}
//登入網頁三秒後執行，只會執行一次
setTimeout(function () {
  
}, 3000);

//每20秒執行一次
setInterval(function () {
   
}, 20000);

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
//案讚
$("#section").on('click', ".nice-b", function () {
    $this =$(this);
    
    console.log($this.parents('.article').attr("articleid"));//getarticleid
   
});
//留言
$("#section").on('click', ".message-b", function () {
    $this =$(this);
    console.log($this.parents('.article').attr("articleid"));//getarticleid
   
});

$("#section").on('click', ".new-friend-button", function () {
    $this =$(this);
    console.log($this.parents('.friend').attr("friendid"));//getarticleid

});
//登出
$('#Logout_button').click(function () {
    document.location.href = "index.html";
    document.cookie ="token=";   
});

$('#PassWord_button').click(function () {
    if($('#update_password_view').css('display') == 'none')
    $('#update_password_view').css('display','block');  
    else
    $('#update_password_view').css('display','none');  
});

$('#Home_button').click(function () {
    document.location.href = "main.html";  
});

$('#Search').click(function () {
    console.log("123");
    $('#Search-block').find('input').each(function () {
        if ($(this).css('display') == 'block')
        {
            console.log($(this));
            return;
        }
       /* if ($(this).prop("checked") == true) {
            right_username.push($(this).parents("ul.trstyle").children("li[name='user']").text());
        }*/
    });
});

//search"
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

    $('#update_password_form').find("input[name='username']").val('');
    $('#update_password_form').find("input[name='password']").val('');
    $('#update_password_form').find("input[name='reconfirm']").val('');
});

/*
$('#Topic_button').click(function () {
    $('#aside').css('display','block');
    $('#section').css('visibility','hidden');
    //visible
});*/

//發文
$('#Article_submit').click(function () {

    var Article_Text =  $('#Article_input').val();

    var jsonStr = JSON.stringify({
        ID: Account_Data.ID,
        Text: Article_Text
    })

    $.ajax({
        url: 'article/'+ Account_Data.ID,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: jsonStr,

        success: function (data) {
            alert('發文成功');
        },
        error: function(data){
            alert('發文失敗');         
        }
    });

});


$(window).scroll(function () {
  
    //讀取新文章
    if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 100) {
        dispaly_Article();
      }
  
});

/*
setTimeout(function () {
    var run = 0;
    var Marquee_Text = $('#Marquee').text();
    var size = (20 * (Marquee_Text.length));
    var body_width = document.body.clientWidth;
    
    setInterval(function () {
        Marquee.style.right = (-size + run)+ 'px';
        
        run += 5;

        if (run > body_width + size) {
            body_width = document.body.clientWidth;
            run = 0;
        }
            
    }, 20);
}, 3000);*/