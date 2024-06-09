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

    Route::get('/users', [UserController::class, 'index'])->name('users')->middleware('checkRole:admin');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store')->middleware('checkRole:admin');
    Route::post('/user/update/{id}', [UserController::class, 'update'])->name('user.update')->middleware('checkRole:admin');
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->name('user.delete')->middleware('checkRole:admin');

    Route::get('/dokter', [DoctorController::class, 'index'])->name('doctors')->middleware('checkRole:admin');
    Route::post('/doctor/store', [DoctorController::class, 'store'])->name('doctor.store')->middleware('checkRole:admin');
    Route::post('/doctor/update/{id}', [DoctorController::class, 'update'])->name('doctor.update')->middleware('checkRole:admin');
    Route::delete('/doctor/delete/{id}', [DoctorController::class, 'destroy'])->name('doctor.delete')->middleware('checkRole:admin');

    Route::get('/pasien', [ConsultationController::class, 'index'])->name('pasien')->middleware('checkRole:dokter');
    Route::post('/pasien/update/{id}', [ConsultationController::class, 'update'])->name('pasien.update')->middleware('checkRole:dokter');
    Route::delete('/pasien/delete/{id}', [ConsultationController::class, 'destroy'])->name('pasien.delete')->middleware('checkRole:dokter');

    Route::get('/konsultasi', [ConsultationController::class, 'consultation'])->name('konsultasi')->middleware('checkRole:pasien');
    Route::post('/konsultasi/store', [ConsultationController::class, 'storeConsultation'])->name('konsultasi.store')->middleware('checkRole:pasien');

    Route::get('/riwayat', [ConsultationController::class, 'historyConsultation'])->name('riwayat')->middleware('checkRole:pasien');
    Route::post('/riwayat/update/{id}', [ConsultationController::class, 'updateRiwayat'])->name('riwayat.update')->middleware('checkRole:pasien');
    Route::delete('/riwayat/delete/{id}', [ConsultationController::class, 'destroyRiwayat'])->name('riwayat.delete')->middleware('checkRole:pasien');

});

require __DIR__.'/auth.php';
