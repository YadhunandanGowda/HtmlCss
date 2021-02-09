$(document).ready(function () {
    $('.planet').click(function () {
        $('.details').each(function(index){
            let su = $(this).css("fill");
            if (su == 'rgb(255, 255, 255)') {
                $(this).css("fill", 'rgba(0, 0, 0, 0)');
                $(this).children('polyline').css("stroke", "transparent");
            }
        });
        $(this).siblings('.details').css("fill", "white");
        $(this).siblings('.details').children('polyline').css("stroke", "white");
    })
});