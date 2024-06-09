<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('telepon');
            $table->string('alamat');
            $table->string('usia');
            $table->enum('jenis_kelamin', ['laki-laki', 'perempuan'])->default('laki-laki');
            $table->text('keluhan');
            $table->text('solusi')->nullable();
            $table->enum('status', ['selesai', 'menunggu'])->default('menunggu');
            $table->unsignedBigInteger('dokter_id');
            $table->unsignedBigInteger('user_id');
            

            $table->foreign('dokter_id')->references('id')->on('doctors');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
