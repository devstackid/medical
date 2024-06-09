<?php

use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);


Route::get('/dashboard', [HomeController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    Route::post('/user/update/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->name('user.delete');

    Route::get('/dokter', [DoctorController::class, 'index'])->name('doctors');
    Route::post('/doctor/store', [DoctorController::class, 'store'])->name('doctor.store');
    Route::post('/doctor/update/{id}', [DoctorController::class, 'update'])->name('doctor.update');
    Route::delete('/doctor/delete/{id}', [DoctorController::class, 'destroy'])->name('doctor.delete');

    Route::get('/pasien', [ConsultationController::class, 'index'])->name('pasien');
    Route::post('/pasien/update/{id}', [ConsultationController::class, 'update'])->name('pasien.update');
    Route::delete('/pasien/delete/{id}', [ConsultationController::class, 'destroy'])->name('pasien.delete');

    Route::get('/konsultasi', [ConsultationController::class, 'consultation'])->name('konsultasi');
    Route::post('/konsultasi/store', [ConsultationController::class, 'storeConsultation'])->name('konsultasi.store');
    Route::post('/konsultasi/update/{id}', [ConsultationController::class, 'updateConsultation'])->name('konsultasi.update');
    Route::delete('/konsultasi/delete/{id}', [ConsultationController::class, 'destroyConsultation'])->name('konsultasi.delete');

    Route::get('/riwayat', [ConsultationController::class, 'historyConsultation'])->name('riwayat');

});

require __DIR__.'/auth.php';
