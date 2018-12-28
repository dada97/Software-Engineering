
var last_click_time;
var body_obj;
var aside_obj;
var section_obj;
var nav_obj;
var user_name;
var limit_time = 10;
var is_logout = false;
var is_online = false;


window.onload = function () {
    send_token();
    aside_obj = document.getElementById('aside');
    section_obj = document.getElementById('section');
    nav_obj = document.getElementById('nav'); 
    meun_button_obj = document.getElementById('meun_button');

    var timer = new Date();
    last_click_time = timer.getTime();

    var userAgent = navigator.userAgent;

}

function send_token(){

    var token = document.cookie;
    
    $.ajax({
        url: '',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(xhr){xhr.setRequestHeader('authorization', token);},
        data: {},
        success: function (data) {
          
            console.log("token success")
            if (data.error == "") {
               
            }
            else {
                alert(data.message);
            }
          
        },
    });
}

function get_friend(){

}
function send_token(){}
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
    $('#section').css('visibility','visible');
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

$("#section").on('click', ".nice-b", function () {
    $this =$(this);
    
    console.log($this.parents('.article'));
   
});

$("#section").on('click', ".message-b", function () {
    $this =$(this);
    console.log($this.parents('.article'));

});

$('#Logout_button').click(function () {
    document.location.href = "index.html";  
});

$('#Home_button').click(function () {
    document.location.href = "main.html";  
});

$('#Topic_button').click(function () {
    $('#aside').css('display','block');
    $('#section').css('visibility','hidden');
    //visible
});

$('#Article_submit').click(function () {

    var Article_Text =  $('#Article_input').val();
   Article_Text = Article_Text.replace(new RegExp("\n", "gm"), '<br/>');//將所有\n換成<br/>
    for(var i =0; i < Article_Text.length ; i++)
    {
        console.log(Article_Text[i]);
    }

    if($('#Article_input').val() == '')
            return false;

    var articele_obj = '<div class="article" articleid="1">'+
    '<div class="article-header"> '+               
            '<img class="photo" src="images/1.jpg">'+           
            '<div class="article-title">'+
                '<div class="article-name" name="username">熊熊</div>'+
                '<div class="article-time" name="username">3分鐘前</div>'+
            '</div>'+                
        '</div>'+
        
    '<div class="article-main">'+                
    Article_Text +     //文章內容
    '</div>'+

    '<div class="article-news"><i class="far fa-thumbs-up"></i> <span class="mag-l-10">'+
    '100'+ //案讚人數
    '</span></div>'+

    '<div class="article-footer">'+
         '<div class="article-footer-button nice-b"><i class="far fa-thumbs-up"></i><span class="mag-l-10">棒</span></div>'+
         '<div class="article-footer-button message-b"><i class="far fa-comment"></i><span class="mag-l-10">我要留言</span></div>'+
    '</div>' +            
'</div>';

    $('#Article_list').prepend(articele_obj);

   
    $('#Article_input').val('');
});


$(window).scroll(function () {
  
    //讀取新文章
    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        console.log("滚动条已经到达底部为" + $(document).scrollTop());
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