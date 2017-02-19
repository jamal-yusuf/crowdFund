

$(document).ready(() => {

    $('.carousel').carousel({
      interval: 4200
    })

    $('body').on('hidden', '#login-modal', function() {
        $('.alert').remove();
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('body').on('click', '.scrollup',function() {
        $("html, body").animate({
            scrollTop : 0
        }, 600);
        return false;
    });

    $('body').on('click', '.arrowDown',function() {
        var wheight=$( window ).height();
        $("html, body").animate({
            scrollTop : wheight+20
        }, 600);
        return false;
    });

    $(document).ready( () => {

        $('.show-my-tooltip').tooltip({
            'placement' : 'bottom'
        });
    });

    $('body').on('click','.viewallcat' ,function(){
        $(".allCategories").toggleClass("hideall");
    });
});
