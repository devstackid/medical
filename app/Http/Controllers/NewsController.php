<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{

    public function index(News $news){
        $userdata = User::with(['role', 'doctor'])
            ->get();
        $myNews = $news::where('author', auth()->user()->name)->latest()->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
            'userData' => $userdata
        ]);
    }


    public function store(Request $request){
            $request->validate([
            'title' => ['required', 'min:3' ,'max:50'],
            'category' => ['required', 'min:3' ,'max:50'],
            'text' => ['required', 'min:3', 'max:255'],
          ]);

          $news = new News();
          $news->title = $request->title;
          $news->category = $request->category;
          $news->text = $request->text;
          $news->author = auth()->user()->name;

          $news->save();

  
          return redirect()->back()->with('message', 'Berhasil menambahkan data');
    }


    public function edit(News $news, Request $request){
        return Inertia::render('EditProject', [
            'myNews' => $news->find($request->id)
        ]);
    }

    public function update(Request $request){
        News::where('author', auth()->user()->name)->update([
            'title' => $request->title,
            'category' => $request->category,
            'text' => $request->text,
        ]);

        return to_route('dashboard')->with('message', 'Berhasil mengubah data');
    }
}
