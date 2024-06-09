<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function specialist(){
        return $this->belongsTo(Specialist::class, 'specialist_id');
    }

    public function consultations(){
        return $this->hasMany(Consultation::class);
    }
    
}
