<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Role;
use App\Models\Specialist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        $userdata = User::with(['role', 'doctor'])
            ->get();

        $roles = Role::where('role' , 'admin')->orWhere('role', 'dokter')->get();


        return Inertia::render('User', [
            'userData' => $userdata,
            'roles' => $roles,
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }

    public function store(Request $request)
{
    // Validasi input
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'role_id' => 'required|exists:roles,id',
    ]);
 

    try {
        // Buat pengguna baru
        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);
        $user->role_id = $validated['role_id'];
        $user->save();

        $doctorRole = Role::where('role', 'dokter')->first();
        $patientRole = Role::where('role', 'pasien')->first();
        if($validated['role_id'] == $doctorRole->id){
            // ambil data user yang baru saja ditambahkan
            $recentUser = User::where('email', $validated['email'])->first();
            $spesialistDefault = '3';
            
            $doctor = new Doctor();
            $doctor->user_id = $recentUser->id;
            $doctor->specialist_id = $spesialistDefault;
            $doctor->save();
        }

        return redirect()->back()->with('success', 'Berhasil menambahkan data pengguna');
    } catch (\Exception $e) {
        return redirect()->back()->withErrors(['message' => 'Gagal menambahkan data pengguna. Silakan coba lagi.']);
    }
}

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'role_id' => 'required|exists:roles,id'
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if($request->password){
            $user->password = Hash::make($request->password);
        }
        $user->role_id = $request->role_id;
        $user->save();

        return redirect()->back()->with('message', 'Berhasil mengubah data pengguna');
    }

    public function destroy($id){
        $user = User::findOrFail($id);

        $doctor = Doctor::where('user_id', $id)->first();

        if($doctor){
            
            $doctor->delete();
        }

        

        $user->delete();

        

        return redirect()->back()->with('message', 'Berhasil menghapus data pengguna');
    }

}
