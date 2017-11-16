$(window).on('load', function() {
    $("#preload").animate({
        opacity:'0',   
    },1000); 
    setTimeout(function(){
        $("#preload").css("display","none");
    },1000);
});

let flag =0, array = [];

$('.button').on('click',function(){
    let string = $(this).siblings('input').val(),
        obj = this;

    if(string =='') {
        $(obj).text('Введите данные!');
        $(obj).siblings('input').css('border-color','rgba(255, 45, 45, 0.33)');
        setTimeout(function(){
            $(obj).text('Далее');   
        },1000);
    } else {
         if(flag==1) {
            $('.age').css('display','none');
            $('.answer').css('display','flex');
             array.push(string);
             if(array[1]>=18){

              $('.Hellow').text('Привествую, '+array[0]+'. Уж '+array[1]+' лет прошло.');  
             }else {
                 $('.Hellow').text('Здарова, '+array[0]+'. Как твои '+array[1]+'?');  

             }

        }
        if(flag==0) {
            $('.name').css('display','none');
            $('.age').css('display','flex');
            array.push(string);
            flag++;
        }
       
    } 
});























    