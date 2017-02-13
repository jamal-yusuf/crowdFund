<div id=topPart class=container-fluid>
    <div id=topLogos class=row>
        <div class="col col-xs-12" >
            ΜΙΑ ΠΛΑΤΦΟΡΜΑ ΤΗΣ <a href="http://www.praksis.gr/" target="_blank"><img src="/images/praksisLogo.png" style="width:54px;"></a> ΓΙΑ ΤΟ ΠΡΟΓΡΑΜΜΑ <a href="http://www.praksis.gr/bcc" target="_blank"><img src="/images/bccLogo.png" style="width:48px;"></a>
        </div>
    </div>
    <div id=brandAndMenu class="row">
        <div id=brand class='col col-sm-4'>  <a href="/homepage"><img src="/images/logo.png"></a> </div>
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


@push('scripts')

<script type="text/javascript">

    $(document).ready(function() {
        $('.searchwrap').on({
            'mouseenter':function(){
               $('.search-query').animate({width: 200},500);
            },
            'mouseleave':function(){
                $('.search-query').animate({width: 0},500);
            }
        });
    });

</script>

@endpush
