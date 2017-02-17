<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading"></div>
                <div class="panel-body" style='text-align: center;'>
                @for ($i=1; $i<10; $i++)
                    <div> {!! url()->current(); !!} </div>
                @endfor
                </div>
            </div>
        </div>
    </div>
</div>
