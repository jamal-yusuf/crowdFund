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

        @include('partials.topPart')

        <dynamic :template="currentPageHtml" :data="propsData"></dynamic>
        <router-view>
        @if (! empty($page_to_load))
            @include("pages.$page_to_load")
        @else
            @include('pages.home')
        @endif
        </router-view>
        @include('partials.bottomPart')


    </div> <!-- app -->

    <!-- Scripts -->
     <script type="text/javascript" src="/js/app.js"></script>
    @stack('scripts')
</body>
</html>
