<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Role;
use App\Models\Specialist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(){
        $doctorRole = Role::where('role', 'dokter')->first();
        $doctors = Doctor::latest()->with(['user', 'specialist'])->get();
        $specialists = Specialist::all();
        $users = User::with('role')
        ->where('role_id', $doctorRole->id)
        ->get();
        return Inertia::render('Doctor', [
            'doctorData' => $doctors,
            'specialists' => $specialists,
            'users' => $users,
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nik' => 'required|string|min:3|max:40|unique:doctors',
            'specialist_id' => 'required|exists:specialists,id',
            'user_id' => 'required|exists:users,id|unique:doctors,user_id',
        ]);

        $doctor = new Doctor();
        $doctor->nik = $request->nik;
        $doctor->specialist_id = $request->specialist_id;
        $doctor->user_id = $request->user_id;

        if ($request->hasFile('gambar')) {
            $imagePath = $request->file('gambar')->store('doctors', 'public');
            $doctor->gambar = $imagePath;
        }

        if ($doctor->save()) {
            return redirect()->back()->with('message', 'Berhasil menambahkan data dokter');
        } else {
            return redirect()->back();
        }

    }

    public function update(Request $request, $id){
        $request->validate([
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nik' => 'required|string|min:3|max:40|unique:doctors,nik,' . $id,
            'specialist_id' => 'required|exists:specialists,id',
            'user_id' => 'required|exists:users,id|unique:doctors,user_id,' . $id,
        ]);
        
        $doctor = Doctor::findOrFail($id);
        $doctor->nik = $request->nik;
        $doctor->specialist_id = $request->specialist_id;
        $doctor->user_id = $request->user_id;

        $oldGambarPath = $doctor->gambar ? 'public/' . $doctor->gambar : null;

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if($oldGambarPath && Storage::exists($oldGambarPath)){
                Storage::disk('public')->delete($doctor->gambar);
            }

            $gambarBaru = $request->file('gambar')->store('doctors', 'public');
            $doctor->gambar = $gambarBaru;
        }

        if ($doctor->save()) {
            return redirect()->back()->with('message', 'Berhasil mengubah data dokter');
        } else {
            return redirect()->back()->with('error', 'Gagal mengubah data dokter');
        }
    }

    public function destroy($id){
        $doctor = Doctor::findOrFail($id);
        $oldGambarPath = $doctor->gambar ? 'public/' . $doctor->gambar : null;
        if ($oldGambarPath && Storage::exists($oldGambarPath)) {
            Storage::delete($oldGambarPath);
        }

        // hapus data pasien
        

        $user = User::where('id' , $doctor->user_id)->first();
        
        $doctor->delete();
        $user->delete();

        

        return redirect()->back()->with('message', 'Berhasil menghapus data dokter');
    }
}
