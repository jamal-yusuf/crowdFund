<?php

namespace App\Http\Controllers;

class PageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page)
    {
        if (!$page) {
            $page = 'home';
        }
        $page = 'home';
        return view('layouts.main')->with(['page_to_load' => $page]);
    }

    public function page($page)
    {
        $page = 'home';
        return view('pages.' . $page);
    }
}
