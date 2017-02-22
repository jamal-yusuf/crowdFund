

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
        var coord=Utils.getCoordinates('#homeCrowdfunding');
        if (coord){
            $("body").animate({
                scrollTop : coord.bottom + window.scrollY
            }, 600);
        }
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
