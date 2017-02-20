<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->


    <link href="/css/app.css" rel="stylesheet">


    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token()]); ?>
    </script>
</head>

<body>
    <div id="app">

        <div id=cssMode >
            <h1 class="visible-xs">EXTRA SMALL screen -xs-</h1>
            <h1 class="visible-sm">SMALL screen -sm- </h1>
            <h1 class="visible-md">MEDIUM screen -md-</h1>
            <h1 class="visible-lg">LARGE screen -lg- </h1>
        </div>


        @include('partials.topPart')
        <router-view>
        @if (! empty($page_to_load))
            @include("pages.$page_to_load")
        @else
            @include('pages.home')
        @endif
        </router-view>
        <div style="height:600px; background-color:green"></div>
        @include('partials.bottomPart')

    </div> <!-- app -->

    <!-- Scripts -->
     <script type="text/javascript" src="/js/app.js"></script>
    @stack('scripts')
</body>
</html>
