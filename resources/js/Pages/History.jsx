import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
export default function consultations(props) {
    const { errors, auth } = usePage().props;

    const [values, setValues] = useState({
        nama_lengkap: "",
        telepon: "",
        alamat: "",
        usia: "",
        jenis_kelamin: "",
        keluhan: "",
        solusi: "",
        status: "",
        dokter_id: "",
        user_id: props.auth.user.id,
    });

    const [isNotif, setIsNotif] = useState(false);
    const [search, setSearch] = useState("");
    const consultationData = props.consultationData;
    const [filteredData, setFilteredData] = useState(consultationData);

    const [editConsultationId, seteditConsultationId] = useState(null);

    useEffect(() => {
        setFilteredData(
            consultationData.filter((consultation) => {
                const searchTerm = search.toLowerCase();
                return (
                    (consultation.nama_lengkap &&
                        consultation.nama_lengkap
                            .toLowerCase()
                            .includes(searchTerm)) ||
                    (consultation.telepon &&
                        consultation.telepon.toLowerCase().includes(searchTerm)) ||
                    (consultation.usia &&
                        consultation.usia.toLowerCase().includes(searchTerm)) ||
                    (consultation.jenis_kelamin &&
                        consultation.jenis_kelamin
                            .toLowerCase()
                            .includes(searchTerm)) ||
                    (consultation.keluhan &&
                        consultation.keluhan.toLowerCase().includes(searchTerm)) ||
                    (consultation.status &&
                        consultation.status.toLowerCase().includes(searchTerm))
                );
            })
        );
    }, [search, consultationData]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsNotif(false); // Set notifikasi menjadi false di awal
        const url = `/riwayat/update/${editConsultationId}`;

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
                setIsNotif(true); // Tampilkan notifikasi jika berhasil
                document.getElementById("my_modal_1").close();
            },
            onError: (errors) => {
                console.error("There was an error!", errors);
            },
        });
    }

    function handleEdit(consultation) {
        setValues({
            nama_lengkap: consultation.nama_lengkap,
            telepon: consultation.telepon,
            alamat: consultation.alamat,
            usia: consultation.usia,
            jenis_kelamin: consultation.jenis_kelamin,
            keluhan: consultation.keluhan,
            dokter_id: consultation.dokter_id,
            user_id: consultation.user_id,
        });
        seteditConsultationId(consultation.id);
        document.getElementById("my_modal_1").showModal();
    }

    function handleDelete(consultationId) {
        if (confirm("Apakah Anda yakin ingin menghapus data konsultasi ini?")) {
            router.post(
                `/riwayat/delete/${consultationId}`,
                {
                    _method: "delete",
                },
                {
                    onSuccess: () => {
                        setIsNotif(true);
                    },
                    onError: (errors) => {
                        console.error("There was an error!", errors);
                    },
                }
            );
        }
    }
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Data Dokter" />

            <div className="py-12 relative w-full">
                <div className="w-full px-3 lg:px-8">
                    <div className="flex items-start justify-between mb-3">
                        <h1 className="text-sm font-bold text-black">
                            Data Riwayat Konsultasi{" "}
                            <span className="block text-slate-700 font-normal">
                                Informasi konsultasi anda
                            </span>
                        </h1>
                    </div>

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
                    <hr />
                    {props.consultationData.length > 0 ? (
                        <div className="overflow-x-auto mt-10">
                            <div className="w-full lg:flex justify-end">
                                <div className="mb-4 overflow-hidden rounded max-w-xs">
                                    <label className="input border-none outline-none flex items-center gap-2 max-w-xs">
                                        <input
                                            type="text"
                                            placeholder="Cari..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="grow border-none outline-none focus:ring-0 focus:border-none focus:outline-none"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="w-4 h-4 opacity-70"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <table className="table table-xs w-full border rounded bg-white overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="py-3"></th>
                                        <th className="py-3">Nama Pasien</th>
                                        <th className="py-3">Nomor Telepom</th>
                                        <th className="py-3">Alamat</th>
                                        <th className="py-3">Usia</th>
                                        <th className="py-3">Jenis Kelamin</th>
                                        <th className="py-3">Keluhan</th>
                                        <th className="py-3">Solusi</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Tanggal Konsultasi</th>
                                        <th className="py-3">Diperbarui Pada</th>
                                        <th className="py-3">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((consultation, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>{consultation.nama_lengkap}</td>
                                                <td>{consultation.telepon}</td>
                                                <td>{consultation.alamat}</td>
                                                <td>{consultation.usia}</td>
                                                <td>{consultation.jenis_kelamin}</td>
                                                <td>{consultation.keluhan}</td>
                                                <td className="whitespace-nowrap">{consultation.solusi}</td>
                                                <td className="bg-yellow-400 text-black text-center">{consultation.status}</td>
                                                <td>{formatDate(consultation.created_at)}</td>
                                                <td>{formatDate(consultation.updated_at)}</td>

                                                <td className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(consultation)
                                                        }
                                                        className="btn btn-warning btn-sm px-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                consultation.id
                                                            )
                                                        }
                                                        className="btn btn-error btn-sm px-4"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-black text-sm font-medium mt-10">
                            Upss.. Maaf Data konsultasi masih kosong!
                        </p>
                    )}
                </div>

                {/* modal tambah dan edit data */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h1 className="text-sm font-bold text-black mb-5">
                            Edit Data Konsultasi
                            <span className="block text-xs font-normal">
                                Silahkan isi form dibawah untuk mengubah data
                                konsultasi
                            </span>
                        </h1>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
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
                                    setIsEdit(false);
                                    document
                                        .getElementById("my_modal_1")
                                        .close();
                                }}
                            >
                                ✕
                            </button>
                        </form>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-2"
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
                                Perbarui
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>
        </AuthenticatedLayout>
    );
}
