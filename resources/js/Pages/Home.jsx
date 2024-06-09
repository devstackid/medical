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
            <h1 className='text-center text-5xl font-black text-black'>Selamat Datang di Devstack.id <span className='block mt-2 text-sm font-normal text-slate-600'>Pembuatan website professional, cepat dan terpercaya</span></h1>
        </div>
        {/* main section */}
        <div className='w-full pt-20'>
          <h1 className='text-base font-bold text-black text-center'>Tentang Kami 
          <p className='block text-sm font-medium text-slate-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam nobis impedit, placeat enim voluptatem hic rem odit similique quam atque.</p></h1>

        </div>
        {/* footer */}
        
    </>
  )
}

export default Home