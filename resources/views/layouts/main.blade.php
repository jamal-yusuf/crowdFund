<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <script type="text/javascript" src="/js/jquery-3.1.1.js"></script>

    <!-- Styles -->

    <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/css/crowdfund.css" rel="stylesheet">

    <script type="text/javascript" src="/bootstrap/js/bootstrap.js"></script>
    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token()]); ?>
    </script>
</head>
<body>
    <div id="fb-root" class=" fb_reset"><div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div></div></div><div style="position: absolute; top: -10000px; height: 0px; width: 0px;"><div><iframe name="fb_xdm_frame_http" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" id="fb_xdm_frame_http" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" src="http://staticxx.facebook.com/connect/xd_arbiter/r/0eWevUAMuoH.js?version=42#channel=f3ded4ccd22c9b&amp;origin=http%3A%2F%2Fwww.oneup.gr" style="border: none;" kwframeid="1"></iframe><iframe name="fb_xdm_frame_https" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" id="fb_xdm_frame_https" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" src="https://staticxx.facebook.com/connect/xd_arbiter/r/0eWevUAMuoH.js?version=42#channel=f3ded4ccd22c9b&amp;origin=http%3A%2F%2Fwww.oneup.gr" style="border: none;" kwframeid="2"></iframe></div></div></div>

    <div id="app">
        <div id=topPart class=container-fluid>
            <div id=topLogos class=row>
                <div class="col col-xs-12" >
                    ΜΙΑ ΠΛΑΤΦΟΡΜΑ ΤΗΣ <a href="http://www.praksis.gr/" target="_blank"><img src="/images/praksisLogo.png" style="width:54px;"></a> ΓΙΑ ΤΟ ΠΡΟΓΡΑΜΜΑ <a href="http://www.praksis.gr/bcc" target="_blank"><img src="/images/bccLogo.png" style="width:48px;"></a>
                </div>
            </div>
            <div id=brandAndMenu class="row">
                <div id=brand class='col col-sm-4'>  <a href="/homepage"><img src="/images/oneUpLogo.png"></a> </div>
                <div id=topMenuWrap  class='hidden-xs'>
                    <ul id="topMenu">
                        <li id="pageabout"><a href="/page/about">About</a></li>
                        <li id="pageworks"><a href="/page/how-it-works">HOW IT WORKS</a></li>
                        <li id="pagedonors"><a href="/page/donate">DONATE</a></li>
                        <li id="pageregister"><a href="/register/">Launch</a></li>
                        <li class="dropdown" id="pagemore">
                            <a tabindex="-1" href="#" data-toggle="dropdown" class="dropdown-toggle">More</a>
                            <ul class="dropdown-menu " style="margin-left: -60px; margin-top: 22px;">
                                <li><a tabindex="-1" href="/page/associates">TEAM</a></li>
                                <li><a tabindex="-1" href="/page/partners">PARTNERS</a></li>
                                <li><a tabindex="-1" href="http://oneupgr.tumblr.com/" target="_blank">BLOG</a></li>
                                <li><a tabindex="-1" href="/page/faq">FAQs</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id=topActionsWrap class='pull-right'>
                    <ul id=topActions class="pull-right">
                        <li  class="searchwrap">
                            <form class="form-search" method="POST" action="/search">
                                    <div class="searchwform" style='background-color: red; '>
                                        <input name="query" type="text" class="search-query"  placeholder="Search">
                                        <input id=search type="submit" class="search-btn" value="" >
                                    </div>
                            </form>
                        </li>
                        <li class="loginlink"><a id="navbar-login" href="/simple-login">LOGIN</a></li>
                        <li class="dropdown" style="margin-top:20px;"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Language <b class="caret"></b> </a>
                            <ul class="dropdown-menu">
                                <li class="active"><a href="/homepage?request_locale=en">English</a></li>
                                <li><a href="/homepage?request_locale=el">Greek</a></li>
                            </ul>
                        </li>
                    </ul>

              </div>   <!-- actions -->
            </div> <!-- brandAndMenu -->
        </div> <!-- topPart -->
        @yield('content')

        <div id=bottomPart class=container-fluid>

            <div id=bring2life class=row >
                <h3>Bringing <strong>Businesses</strong> to Life</h3>
                <a href="/category/all" class="white_btn">Back a business</a>
                <a href="/register/" class="blue_btn">Launch your business</a>
            </div> <!-- bring2life -->

            <div id=restOfFooter class=row>
                <div id=footerLinksPart1 class='row'>
                  <div class=row>
                    <div class="col col-sm-2 span2">
                        <a href="/page/about"><h4>About</h4></a>
                        <a href="/page/contact-us"><h4>Contact Us</h4></a>
                        <a href="/terms-of-use-en.pdf"><h4>Terms of Use</h4></a>
                    </div>
                    <div class="col col-sm-3 span2">
                        <a href="/page/how-it-works"><h4>HOW IT WORKS</h4></a>
                    </div>
                    <div class="col col-sm-2 span2">
                        <a href="/page/donate"><h4>DONATE</h4></a>
                    </div>
                    <div class="col col-sm-2 span2">
                        <a href="/register/"><h4>Launch</h4></a>
                    </div>
                    <div class="col col-sm-2 span2">
                        <a href="/page/associates"><h4>TEAM</h4></a>
                        <a href="/page/partners"><h4>PARTNERS</h4></a>
                        <a href="http://oneupgr.tumblr.com/" target="blank"><h4>BLOG</h4></a>
                        <a href="/page/faq"><h4>FAQs</h4></a>
                    </div>
                  </div> <!-- row -->
                </div> <!-- footerLinksPart1 -->

                <div id=footerLinksPart2 class=row>
                    <div class="span12" style="position:relative;">
                        <div id="platformOf">
                            ΜΙΑ ΠΛΑΤΦΟΡΜΑ ΤΗΣ <a href="http://www.praksis.gr/" target="_blank">PRAKSIS</a> ΓΙΑ ΤΟ ΠΡΟΓΡΑΜΜΑ
                            <a href="http://www.praksis.gr/bcc" target="_blank">BCC</a>
                        </div>

                        <a href="http://www.praksis.gr/" target="_blank"><img src="/images/logo_footer2.png" style="float:left; border-right:solid 2px #505050; margin-right:10px;" class="footerlogo"></a>
                        <a href="http://www.praksis.gr/bcc" target="_blank"><img src="/images/logo_footer.png" style="float:left;" class="footerlogo"></a>

                        <div>
                            <form id="newsletter-form" name="global.NewsletterForm" action="/page/about" method="post">
                                <fieldset>
                                    <legend>Subscribe to our Newsletter</legend>
                                    <div class="control-group ">
                                        <div class="controls">
                                            <input type="text" name="newsletterMail" value="" id="newsletterMail" placeholder="your@email.com">
                                            <button class="blue_btn" type="button" onclick="sendNewsletter()">Submit</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>

                            <ul class="socialfooter">
                                <h4>FOLLOW US</h4>
                                <li class="fb"><a href="https://www.facebook.com/praksis.bcc/" target="_blank"><img src="/images/social/fb-off.png" width="48" height="48"></a></li>
                                <li class="tw" style="display:none"><a href="#" target="_blank"><img src="/images/social/tw-off.png" width="48" height="48"></a></li>
                                <li class="gg" style="display:none"><a href="#"><img src="/images/social/g-off.png" width="48" height="48"></a></li>
                                <li class="rss" style="display:none"><a href="#"><img src="/images/social/rss-off.png" width="48" height="48"></a></li>
                            </ul><!-- /socialfooter -->
                        </div>
                    </div>  <!-- span12 -->
                </div> <!-- footerLinks -->

                <div id=copyright class="row">
                <div style="float:left" class="allrights">
                    © 2015 PRAKSIS. All Rights Reserved.
                </div>
                </div>

            </div> <!-- rest of footer -->
        </div> <!-- bottomPart -->


    </div> <!-- app -->

    <!-- Scripts -->
    <script type="text/javascript">
    $(document).ready(function() {
        $('.searchwrap').on({
            'mouseenter':function(){
               $('.search-query').animate({width: 200},500);
            },'mouseleave':function(){
                $('.search-query').animate({width: 0},500);
            }
        });
    });
    </script>
</body>
</html>
