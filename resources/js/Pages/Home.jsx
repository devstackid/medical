import React from 'react'
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

function Home(props) {
  return (
    <>
        <Head title={props.title}/>
        {/* navbar */}
        <Navbar />
        {/* header section */}
        <div className='flex items-center justify-center h-[80vh] px-10'>
            <h1 className='text-center text-5xl font-black text-black'>Selamat Datang di Dokterku <span className='block mt-2 text-sm font-normal text-slate-600'>Dokterku adalah sebuah aplikasi layanan konsultasi online gratis yag terhubung dengan para dokter spesialis di seluruh indonesia</span></h1>
        </div>
        <div className='fixed bottom-0 left-0 right-0 py-5 text-center text-xs font-normal text-black'>
          Copyright, 2024. @devstack.id. All Right Reserved.
        </div>
        
    </>
  )
}

export default Home