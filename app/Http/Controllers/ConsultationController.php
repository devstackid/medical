<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Role;
use App\Models\Specialist;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index(){
        $idUserLogin = auth()->user()->id;
        $idDokterLogin = Doctor::where('user_id', $idUserLogin)->first();
        $patientData = Consultation::where('dokter_id', $idDokterLogin->id)->orderBy('updated_at', 'desc')->get();
        return Inertia::render('Patients', [
            'patientData' => $patientData,
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'telepon' => 'required|string|min:5|max:30',
            'alamat' => 'required|string|min:5|max:255',
            'usia' => 'required|string|min:1|max:50',
            'jenis_kelamin' => 'required|exists:consultations,jenis_kelamin',
            'keluhan' => 'required|string',
            'solusi' => 'required|string',
            'status' => 'required|exists:consultations,status',
            'dokter_id' => 'required|exists:doctors,id',
        ]);

        $consultations = Consultation::findOrFail($id);
        $consultations->nama_lengkap = $request->nama_lengkap;
        $consultations->telepon = $request->telepon;
        $consultations->alamat = $request->alamat;
        $consultations->usia = $request->usia;
        $consultations->jenis_kelamin = $request->jenis_kelamin;
        $consultations->keluhan = $request->keluhan;
        $consultations->solusi = $request->solusi;
        $consultations->status = "selesai";
        $consultations->dokter_id = $request->dokter_id;
        
        $consultations->save();

        return redirect()->back()->with('message', 'Solusi untuk konsultasi pasien telah diberikan.');
    }

    public function destroy($id){
        $consultations = Consultation::findOrFail($id);       

        $consultations->delete();
     

        return redirect()->back()->with('message', 'Berhasil menghapus data konsultasi pasien');
    }

    public function consultation(){
        $doctors = Doctor::with(['specialist', 'user'])->get();
        return Inertia::render('Consultation', [
            'doctors' => $doctors,
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }
    
    public function storeConsultation(Request $request){
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|min:4|max:50',
            'telepon' => 'required|string|min:4|max:50',
            'alamat' => 'required|string|min:4|max:50',
            'usia' => 'required|string|min:1',
            'jenis_kelamin' => 'required|string',
            'keluhan' => 'required|min:5',
            'dokter_id' => 'required|exists:doctors,id',
            'user_id' => 'required|exists:users,id',
        ]);


        
            $consultation = new Consultation();
            $consultation->nama_lengkap = $validated['nama_lengkap'];
            $consultation->telepon = $validated['telepon'];
            $consultation->alamat = $validated['alamat'];
            $consultation->usia = $validated['usia'];
            $consultation->jenis_kelamin = $validated['jenis_kelamin'];
            $consultation->keluhan = $validated['keluhan'];
            $consultation->dokter_id = $validated['dokter_id'];
            $consultation->user_id = $validated['user_id'];

            if($consultation->save()){

            return redirect()->back()->with('success', 'Berhasil.. Saat ini konsultasi sedang dalam proses menunggu solusi dari dokter. Anda dapat mengecek status konsultasi pada halaman riwayat konsultasi');
            } else {
                return redirect()->back()->with('error', 'Gagal mengirimkan data konsultasi. Silakan coba lagi.');
            }

        
    }

    

    public function historyConsultation(){
        $idUserLogin = auth()->user()->id;
        $doctors = Doctor::with(['specialist', 'user'])->get();
        $consultationData = Consultation::with('doctor')->where('user_id', $idUserLogin)->orderBy('updated_at', 'desc')->get();
        return Inertia::render('History', [
            'doctors' => $doctors,
            'consultationData' => $consultationData,
            'auth' => [
                'user' => auth()->user()->load('role'), // Load the role for the authenticated user
            ],
        ]);
    }

    public function updateRiwayat(Request $request, $id){
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'telepon' => 'required|string|min:5|max:30',
            'alamat' => 'required|string|min:5|max:255',
            'usia' => 'required|string|min:1|max:50',
            'jenis_kelamin' => 'required|exists:consultations,jenis_kelamin',
            'keluhan' => 'required|string',
            'dokter_id' => 'required|exists:doctors,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $consultations = Consultation::findOrFail($id);
        $consultations->nama_lengkap = $request->nama_lengkap;
        $consultations->telepon = $request->telepon;
        $consultations->alamat = $request->alamat;
        $consultations->usia = $request->usia;
        $consultations->jenis_kelamin = $request->jenis_kelamin;
        $consultations->keluhan = $request->keluhan;
        $consultations->dokter_id = $request->dokter_id;
        $consultations->user_id = $request->user_id;
        
        $consultations->save();

        return redirect()->back()->with('message', 'Berhasil melakukan perubahan.');
    }

    public function destroyRiwayat($id){
        $consultations = Consultation::findOrFail($id);       

        $consultations->delete();
    

        return redirect()->back()->with('message', 'Berhasil menghapus data konsultasi');
    }
}
