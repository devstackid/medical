import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Consultation(props) {
    const { errors, auth } = usePage().props;

    const [isNotif, setIsNotif] = useState(false);
    const [values, setValues] = useState({
        nama_lengkap : "",
        telepon : "",
        alamat : "",
        usia : "",
        jenis_kelamin : "",
        keluhan : "",
        dokter_id : "",
        user_id : props.auth.user.id,
    });

    function handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]:value,
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        const url = 'konsultasi/store';
        router.post(url, values, {
            onSuccess: () => {
                setValues({
                    nama_lengkap: "",
                    telepon: "",
                    alamat: "",
                    usia: "",
                    jenis_kelamin: "",
                    keluhan: "",
                    dokter_id: "",
                    user_id: props.auth.user.id,
                });
                setIsNotif(true);
            },
            onError: (errors) => {
                console.error('There was an error!', errors);
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Konsultasi
                </h2>
            }
        >
            <Head title="Konsultasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-3 lg:px-8">
                    <h1 className="text-sm font-bold text-black">
                        Konsultasi Kesehatan{" "}
                        <span className="block text-slate-700 font-normal">
                            Lakukan konsultasi dengan mengisi form dibawah ini
                        </span>
                    </h1>
                    {isNotif && (
                        <div role="alert" className="alert shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="stroke-info shrink-0 w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <div>
                                <h3 className="font-bold">Success!</h3>
                                <div className="text-xs">
                                    {props.flash.message}
                                </div>
                            </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5"
                    >
                        <input
                            id="nama_lengkap"
                            name="nama_lengkap"
                            value={values.nama_lengkap}
                            onChange={handleChange}
                            type="text"
                            placeholder="Nama Lengkap"
                            className="input input-bordered placeholder:text-sm w-full"
                        />
                        {errors.nama_lengkap && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.nama_lengkap}
                            </div>
                        )}

                        <input
                            id="telepon"
                            name="telepon"
                            value={values.telepon}
                            onChange={handleChange}
                            type="number"
                            placeholder="Nomor Telepon"
                            className="input input-bordered placeholder:text-sm w-full"
                        />
                        {errors.telepon && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.telepon}
                            </div>
                        )}

                        <input
                            id="alamat"
                            name="alamat"
                            value={values.alamat}
                            onChange={handleChange}
                            type="text"
                            placeholder="Alamat"
                            className="input input-bordered placeholder:text-sm w-full"
                        />
                        {errors.alamat && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.alamat}
                            </div>
                        )}

                        <input
                            id="usia"
                            name="usia"
                            value={values.usia}
                            onChange={handleChange}
                            type="number"
                            placeholder="Usia"
                            className="input input-bordered placeholder:text-sm w-full"
                        />
                        {errors.usia && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.usia}
                            </div>
                        )}

                        <select
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            value={values.jenis_kelamin}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">
                                Jenis Kelamin
                            </option>

                            <option value="laki-laki">Laki - Laki</option>
                            <option value="perempuan">Perempuan</option>
                        </select>

                        {errors.jenis_kelamin && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.jenis_kelamin}
                            </div>
                        )}

                        <select
                            id="dokter_id"
                            name="dokter_id"
                            value={values.dokter_id}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">
                                Pilih Dokter Spesialis
                            </option>
                            {props.doctors && props.doctors.length > 0 ? (
                                props.doctors.map((doctor, i) => (
                                    <option value={doctor.id} key={i}>
                                        {doctor.user.name} -{" "}
                                        {doctor.specialist.specialist}
                                    </option>
                                ))
                            ) : (
                                <option disabled>
                                    Saat ini belum ada dokter yang tersedia
                                </option>
                            )}
                        </select>

                        {errors.dokter_id && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.dokter_id}
                            </div>
                        )}

                        <textarea
                            id="keluhan"
                            name="keluhan"
                            value={values.keluhan}
                            onChange={handleChange}
                            className="textarea textarea-accent"
                            placeholder="Keluhan yang ingin anda konsultasikan"
                        ></textarea>
                        {errors.keluhan && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.keluhan}
                            </div>
                        )}

                        

                        <input
                            id="user_id"
                            name="user_id"
                            value={values.user_id}
                            onChange={handleChange}
                            type="hidden"
                            placeholder="User id"
                            className="input input-bordered placeholder:text-sm w-full"
                        />
                        {errors.user_id && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.user_id}
                            </div>
                        )}

                        <button className="btn bg-purple-700 text-white hover:text-black text-sm font-bold px-10 w-max uppercase">
                            Lanjutkan
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
