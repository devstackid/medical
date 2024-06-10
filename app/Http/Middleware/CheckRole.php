<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle($request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        if (!$user || !in_array($user->role->role, $roles)) {
            // Jika pengguna tidak memiliki role yang sesuai, redirect atau berikan respon error
            return redirect('/dashboard')->with('error', 'Anda tidak memiliki akses ke halaman ini');
        }

        return $next($request);
    }
}
