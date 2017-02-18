<?php

namespace App\Http\Controllers;

class PageController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function homePage()
    {
        return $this->page('home');
    }

    public function page($requestedPage = 'home')
    {
        if (!$requestedPage) {
            $requestedPage = 'home';
        }

        $getPage = $requestedPage;
        if (!\View::exists('pages.' . $requestedPage)) {
            $getPage = 'stub';
        }
        return view('layouts.main')->with(['page_to_load' => $getPage, 'requested_page' => $requestedPage]);
    }

    public function api($requestedPage)
    {
        $getPage = $requestedPage;
        if (!\View::exists('pages.' . $requestedPage)) {
            $getPage = 'stub';
        }
        return view('pages.' . $getPage)->with(['page_to_load' => $getPage, 'requested_page' => $requestedPage]);
    }
}
