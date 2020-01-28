$(document).ready(function (){

    var $win = $(window);
    var winHei=$win.height();	// window height

    // window resize
	$win.resize(function(){
		winHei=$win.height();
		$win.trigger("scroll");
    });

    var tgHei;		//outerHeight
	var tgTop;	//offset().top
	var start;
    var end;

    $(window).on("scroll", function () {
            var scrollY=$(this).scrollTop();
            console.log(scrollY);
    
            $(".fade").each(function () {
                tgHei=$(this).outerHeight();
                tgTop=$(this).offset().top;
            
                start = tgTop+tgHei*0.5-winHei;
                end = tgTop+tgHei*0.6;
            
                if (start < scrollY && end > scrollY) 
                    $(this).addClass('on');
            
                else
                    $(this).removeClass('on');
            });
    });
});