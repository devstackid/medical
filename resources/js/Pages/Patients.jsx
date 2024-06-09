import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
export default function Patients(props) {
    const { errors } = usePage().props;

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
    });

    const [isNotif, setIsNotif] = useState(false);
    const [search, setSearch] = useState("");
    const patientData = props.patientData;
    const [filteredData, setFilteredData] = useState(patientData);

    const [editPatientId, setEditPatientId] = useState(null);

    useEffect(() => {
        setFilteredData(
            patientData.filter((patient) => {
                const searchTerm = search.toLowerCase();
                return (
                    (patient.nama_lengkap &&
                        patient.nama_lengkap
                            .toLowerCase()
                            .includes(searchTerm)) ||
                    (patient.telepon &&
                        patient.telepon.toLowerCase().includes(searchTerm)) ||
                    (patient.usia &&
                        patient.usia.toLowerCase().includes(searchTerm)) ||
                    (patient.jenis_kelamin &&
                        patient.jenis_kelamin
                            .toLowerCase()
                            .includes(searchTerm)) ||
                    (patient.keluhan &&
                        patient.keluhan.toLowerCase().includes(searchTerm)) ||
                    (patient.status &&
                        patient.status.toLowerCase().includes(searchTerm))
                );
            })
        );
    }, [search, patientData]);

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
        const url = `/pasien/update/${editPatientId}`;

        router.post(url, values, {
            onSuccess: () => {
                setValues({
                    nama_lengkap: "",
                    telepon: "",
                    alamat: "",
                    usia: "",
                    jenis_kelamin: "",
                    keluhan: "",
                    solusi: "",
                    status: "",
                    dokter_id: "",
                });
                setIsNotif(true); // Tampilkan notifikasi jika berhasil
                document.getElementById("my_modal_1").close();
            },
            onError: (errors) => {
                console.error("There was an error!", errors);
            },
        });
    }

    function handleEdit(patient) {
        setValues({
            nama_lengkap: patient.nama_lengkap,
            telepon: patient.telepon,
            alamat: patient.alamat,
            usia: patient.usia,
            jenis_kelamin: patient.jenis_kelamin,
            keluhan: patient.keluhan,
            solusi: patient.solusi,
            status: patient.status,
            dokter_id: patient.dokter_id,
        });
        setEditPatientId(patient.id);
        document.getElementById("my_modal_1").showModal();
    }

    function handleDelete(patientId) {
        if (confirm("Apakah Anda yakin ingin menghapus data konsultasi ini?")) {
            router.post(
                `/pasien/delete/${patientId}`,
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

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Data Dokter" />

            <div className="py-12 relative w-full">
                <div className="w-full px-3 lg:px-8">
                    <div className="flex items-start justify-between mb-3">
                        <h1 className="text-sm font-bold text-black">
                            Data Konsultasi Pasien{" "}
                            <span className="block text-slate-700 font-normal">
                                Anda dapat mengelola data konsultasi pasien
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
                    {props.patientData.length > 0 ? (
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
                                    {filteredData.map((patient, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>{patient.nama_lengkap}</td>
                                                <td>{patient.telepon}</td>
                                                <td>{patient.alamat}</td>
                                                <td>{patient.usia}</td>
                                                <td>{patient.jenis_kelamin}</td>
                                                <td>{patient.keluhan}</td>
                                                <td>{patient.solusi}</td>
                                                <td>{patient.status}</td>
                                                <td>{patient.created_at}</td>
                                                <td>{patient.updated_at}</td>

                                                <td className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(patient)
                                                        }
                                                        className="btn btn-warning btn-sm px-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                patient.id
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
                        <h1 className="text-sm font-bold text-black">
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
                                        solusi: "",
                                        status: "",
                                        dokter_id: "",
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
                                placeholder="Nama lengkap pasien"
                                readOnly
                                className="input input-bordered bg-gray-50 placeholder:text-sm w-full mt-5"
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
                                type="hidden"
                                placeholder="Nomor telepon"
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
                                type="hidden"
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
                                type="hidden"
                                placeholder="Usia"
                                className="input input-bordered placeholder:text-sm w-full"
                            />
                            {errors.usia && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.usia}
                                </div>
                            )}

                            <input
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={values.jenis_kelamin}
                                onChange={handleChange}
                                type="hidden"
                                placeholder="Jenis Kelamin"
                                className="input input-bordered placeholder:text-sm w-full"
                            />
                            {errors.jenis_kelamin && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.jenis_kelamin}
                                </div>
                            )}

                            <input
                                id="keluhan"
                                name="keluhan"
                                value={values.keluhan}
                                onChange={handleChange}
                                type="text"
                                placeholder="Keluhan"
                                readOnly
                                className="input input-bordered bg-gray-50 placeholder:text-sm w-full"
                            />
                            {errors.keluhan && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.keluhan}
                                </div>
                            )}

                            <span className="block text-xs font-medium text-black mt-2">Solusi</span>

                            <textarea
                                id="solusi"
                                name="solusi"
                                value={values.solusi}
                                onChange={handleChange}
                                className="textarea textarea-accent"
                                placeholder="Solusi"
                            ></textarea>
                            {errors.solusi && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.solusi}
                                </div>
                            )}


                            <input
                                id="status"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                type="hidden"
                                placeholder="Status Konsultasi"
                                className="input input-bordered placeholder:text-sm w-full"
                            />
                            {errors.status && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.status}
                                </div>
                            )}

                            <input
                                id="dokter_id"
                                name="dokter_id"
                                value={values.dokter_id}
                                onChange={handleChange}
                                type="hidden"
                                placeholder="Dokter id"
                                className="input input-bordered placeholder:text-sm w-full"
                            />
                            {errors.dokter_id && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.dokter_id}
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
