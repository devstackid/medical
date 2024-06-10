<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Role;
use App\Models\Specialist;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Role::create([
            'id' => 1,
            'role' => 'admin'
        ]);

        Role::create([
            'id' => 2,
            'role' => 'dokter'
        ]);

        Role::create([
            'id' => 3,
            'role' => 'pasien'
        ]);


        User::create([
            'id' => 1,
            'name' => 'Muhammad Syaifuddin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role_id' => 1
        ]);
        

        Specialist::create([
            'id' => 1,
            'specialist' => 'paru-paru',
        ]);

        Specialist::create([
            'id' => 2,
            'specialist' => 'kulit',
        ]);

        Specialist::create([
            'id' => 3,
            'specialist' => 'tidak ada',
        ]);


        
    }
}
