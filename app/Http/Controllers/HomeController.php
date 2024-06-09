<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        return Inertia::render('Home', [
            'title' => 'Beranda',
        ]);
    }

    public function dashboard(){
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }
}
