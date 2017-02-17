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

    public function page($page = 'home')
    {
        if (!$page) {
            $page = 'home';
        }
        $page = 'home';
        return view('layouts.main')->with(['page_to_load' => $page]);
    }

    public function api($page)
    {
        $page = 'home';
        return view('pages.' . $page);
    }
}
