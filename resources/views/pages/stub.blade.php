<div class="container">
    <div class="row" style='display:flex; flex-direction: column; justify-content: center; '>
        <div style="margin-top:50px;  text-align: center; font-size:26px;padding:20px ; border:2px solid darkgray;">
            You have asked for page <b>{!! $requested_page  !!}  </b>
        </div>
        <div style='display:flex; flex-direction: column; ' >
            <div id=stub style='text-align:center; justify-content: center; font-size:32px; padding:80px; line-height:90px; margin-bottom:50px; ;  border:1px solid darkgray;'>
                    Page <span style='color:red; font-weight:bold'>{!! $requested_page  !!}</span> is Under Construction
            </div>
            <div style=" font-size: 11px; line-height:11px; align-self : flex-end ;"> requested url :  {!! url()->current() !!}</div>
        </div>
    </div>
</div>
