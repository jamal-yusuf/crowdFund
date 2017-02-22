<div id=homePage>

    <div id=homePicturesCarousel>
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <!-- <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1" class=""></li>
                <li data-target="#myCarousel" data-slide-to="2" class=""></li>
            </ol> -->
            <div class="carousel-inner" role=listbox>
                <div class="item active">
                    <div class="hasimg" style="background-image:url('/images/homeBanner1.jpg');">
                        <div class="carousel-inner-div">
                            <button class="startBtn show-my-tooltip" type="button" onclick="gotoPage('/page/projects')"  data-toggle="tooltip" data-placement="bottom" title="Back a business">Back a business!</button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="hasimg" style="background-image:url('/images/homeBanner2.jpg');">
                        <div class="carousel-inner-div">
                            <button class="startBtn show-my-tooltip" type="button" onclick="VueRouter.push('/page/projects')"  data-toggle="tooltip" data-placement="bottom" title="Back a business">Back a business!</button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="hasimg" style="background-image:url('/images/homeBanner3.jpg');">
                        <div class="carousel-inner-div">
                            <button class="startBtn show-my-tooltip" type="button" onclick="VueRouter.push('/page/projects')"  data-toggle="tooltip" data-placement="bottom" title="Back a business">Back a business!</button>
                        </div>
                    </div>
                </div>
            </div>
            <a class="left carousel-control" href="#myCarousel" data-slide="prev" style="border: none; background: none; top: 50%; left:10px">
                <img class="img-arrow" alt="" src="/images/arrow-left_white.png">
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next" style="border: none; background: none; top: 50%; right:10px">
                <img class="img-arrow" alt="" src="/images/arrow-right_white.png">
            </a>
        </div>
    </div>
    <div id=homeCrowdfunding class="row categorieslinks">
        <div class="bannerlinks">

                <div href="#" class="arrowDown"><img alt="" src="/images/arrow_round_down_white.png"></div>

                <h2>Business Crowdfunding</h2>
                <h4>Kick-starting new businesses in Greece</h4>
                <ul id=ul class=topcat>

                    <li class="blk_1">
                        <h3>FULFILL YOUR DREAMS</h3>
                    </li>

                    <li class="blk_2">
                        <h3>FIND POTENTIAL DONORS</h3>
                    </li>

                    <li class="blk_3">
                        <h3>REACH YOUR FUNDING TARGET<br>
                            AND RUN YOUR BUSINESS</h3>
                    </li>

                </ul>


        </div>

    </div>

    <div id=homeActiveProjects>
        <div style="height:600px; background-color:offwhite">
            <h1> waiting for projects to appear here </h1>
        </div>
    </div>

    <div id=homeBrowse class="row categorieslinks">
        <div class="browseLinks">

            <h4><a href="/page/projects">Browse Businesses</a></h2>
            <ul class="topcat">
                <li class="blk_4">
                    <h3>Retail</h3>
                </li>

                <li class="blk_5">
                    <h3>Services</h3>
                </li>

                <li class="blk_6">
                    <h3>New ideas - Technology</h3>
                </li>

            </ul>

        </div>
    </div>

</div>



@if ( ! request()->ajax())

@push('scripts')

@endif

<script type="text/javascript">

    $(document).ready( () => {

        $('.show-my-tooltip').tooltip({
            'placement' : 'right'
        });
    });

</script>

@if ( ! request()->ajax())

@endpush

@endif
