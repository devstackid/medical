<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\News;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
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
        $idRoleDoctor = Role::where('role', 'dokter')->first()->id;
        $idRolePasien = Role::where('role', 'pasien')->first()->id;
        $idRoleAdmin = Role::where('role', 'admin')->first()->id;


        if(auth()->user()->role_id == $idRoleAdmin){
            $now = Carbon::now();
            $sevenDaysAgo = $now->copy()->subDays(7);
            $oneMonthAgo = $now->copy()->subMonth();
            $oneYearAgo = $now->copy()->subYear();
        
            
        
            $doctorsLast7Days = User::where('role_id', $idRoleDoctor)
                ->where('created_at', '>=', $sevenDaysAgo)
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->get();
        
            // Query to get doctors created within the last month
            $doctorsLastMonth = User::where('role_id', $idRoleDoctor)
                ->where('created_at', '>=', $oneMonthAgo)
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->get();
        
            // Query to get doctors created within the last year
            $doctorsLastYear = User::where('role_id', $idRoleDoctor)
                ->where('created_at', '>=', $oneYearAgo)
                ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->groupBy('month')
                ->get();
        
            $patientsLast7Days = User::where('role_id', $idRolePasien)
                ->where('created_at', '>=', $sevenDaysAgo)
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->get();
        
            // Query to get patients created within the last month
            $patientsLastMonth = User::where('role_id', $idRolePasien)
                ->where('created_at', '>=', $oneMonthAgo)
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->get();
        
            // Query to get patients created within the last year
            $patientsLastYear = User::where('role_id', $idRolePasien)
                ->where('created_at', '>=', $oneYearAgo)
                ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->groupBy('month')
                ->get();
        
                
        
        // data konsultasi
                $consultationsLast7Days = Consultation::where('created_at', '>=', $sevenDaysAgo)
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->get();
        
        
            $consultationsLastMonth = Consultation::where('created_at', '>=', $oneMonthAgo)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get();
        
            $consultationsLastYear = Consultation::where('created_at', '>=', $oneYearAgo)
                ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->groupBy('month')
                ->get();
        
        
        
            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => auth()->user()->load('role'), // Load the role for the authenticated user
                ],
                'doctorsLast7Days' => $doctorsLast7Days,
                'doctorsLastMonth' => $doctorsLastMonth,
                'doctorsLastYear' => $doctorsLastYear,
                'patientsLast7Days' => $patientsLast7Days,
                'patientsLastMonth' => $patientsLastMonth,
                'patientsLastYear' => $patientsLastYear,
                'consultationsLast7Days' => $consultationsLast7Days,
                    'consultationsLastMonth' => $consultationsLastMonth,
                    'consultationsLastYear' => $consultationsLastYear,
            ]);
        } else {
            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => auth()->user()->load('role'), // Load the role for the authenticated user
                ]
            ]);
        }
        
        
}
}
