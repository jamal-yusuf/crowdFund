<div id=topPart class=container-fluid>
    <div id=topLogos class=row>
        <div class="col col-xs-12" >
            ΜΙΑ ΠΛΑΤΦΟΡΜΑ ΤΗΣ <a href="http://www.example.gr/something" target="_blank"><img src="/images/parentLogo.png" style="width:54px;"></a> ΓΙΑ ΤΟ ΠΡΟΓΡΑΜΜΑ <a href="http://www.example.gr/something" target="_blank"><img src="/images/myLogo.png" style="width:48px;"></a>
        </div>
    </div>
    <div id=brandAndMenu class="row">
        <div id=brand class='col col-sm-4'>  <router-link to="/"><img src="/images/logo.png"></router-link> </div>
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#topMenuWrap">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
        </button>
        <div id=topMenuWrap  class='navbar-collapse collapse'>
            <ul id="topMenu" >
                <li id="pageabout"><router-link to="/page/about">About</router-link></li>
                <li id="pageworks"><router-link to="/page/howitworks">HOW IT WORKS</router-link></li>
                <li id="pagedonors"><router-link to="/page/donate">DONATE</router-link></li>
                <li id="pageregister"><router-link to="/page/register/">Launch</router-link></li>
                <li class=visible-xs ><router-link tabindex="-1" to="/page/team">TEAM</router-link></li>
                <li class=visible-xs ><router-link tabindex="-1" to="/page/partners">PARTNERS</router-link></li>
                <li class=visible-xs ><a tabindex="-1" href="http://oneupgr.tumblr.com/" target="_blank">BLOG</a></li>
                <li class=visible-xs ><router-link tabindex="-1" to="/page/faq">FAQs</router-link></li>

                <li class="hidden-xs dropdown" id="pagemore">
                    <a tabindex="-1" href="#" data-toggle="dropdown" class="dropdown-toggle">More</a>
                    <ul class="dropdown-menu " style="margin-left: -60px; margin-top: 22px;">
                        <li><router-link tabindex="-1" to="/page/team">TEAM</router-link></li>
                        <li><router-link tabindex="-1" to="/page/partners">PARTNERS</router-link></li>
                        <li><a tabindex="-1" href="http://oneupgr.tumblr.com/" target="_blank">BLOG</a></li>
                        <li><router-link tabindex="-1" to="/page/faq">FAQs</router-link></li>
                    </ul>
                </li>
                @if (Auth::guest())
                    <li class="loginlink visible-xs">><a id="navbar-login" href="{{ route('login') }}">LOGIN</a></li>
                @else
                    <li class="loginlink visible-xs">
                                <a href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                @endif

            </ul>
        </div>



        <div id=topActionsWrap class='pull-right hidden-xs'>
            <ul id=topActions class="pull-right">
                <li  class="searchwrap">
                    <form class="form-search" method="POST" action="/search">
                            <div class="searchwform" style='background-color: red; '>
                                <input name="query" type="text" class="search-query"  placeholder="Search">
                                <input id=search type="submit" class="search-btn" value="" >
                            </div>
                    </form>
                </li>

                @if (Auth::guest())
                    <li class="loginlink"><a href="{{ route('login') }}">LOGIN</a></li>
                @else
                    <li class="loginlink dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </li>
                @endif
                <li class="dropdown" ><a href="#" class="dropdown-toggle" data-toggle="dropdown">Language <b class="caret"></b> </a>
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
               $('.search-query').animate({width: 200,
                                          'box-shadow':'0px 0px 0px rgba(0, 0, 5, 0.065) inset',
                                          'border-left':'2px solid black' },500).focus();
            },
            'mouseleave':function(){
                $('.search-query').animate({width: 0,'box-shadow': "none", 'border':"none"  },500).blur();
            }
        });
    });

</script>

@endpush
