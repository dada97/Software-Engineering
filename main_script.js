
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

    aside_obj = document.getElementById('aside');
    section_obj = document.getElementById('section');
    nav_obj = document.getElementById('nav'); 
    meun_button_obj = document.getElementById('meun_button');

    var timer = new Date();
    last_click_time = timer.getTime();

    var userAgent = navigator.userAgent;

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