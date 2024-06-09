import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
export default function Doctor(props) {
    const { errors } = usePage().props;
    const fileInputRef = useRef(null);

    const [values, setValues] = useState({
        gambar: null,
        nik: "",
        specialist_id: "",
        user_id: "",
    });

    const [isNotif, setIsNotif] = useState(false);
    const [search, setSearch] = useState("");
    const doctorData = props.doctorData;
    const [filteredData, setFilteredData] = useState(doctorData);

    const [isEdit, setIsEdit] = useState(false);
    const [editDoctorId, setEditDoctorId] = useState(null);


    useEffect(() => {
        setFilteredData(
            doctorData.filter((doctor) => {
                const searchTerm = search.toLowerCase();
                return (
                    (doctor.nik && doctor.nik.toLowerCase().includes(searchTerm)) ||
                    (doctor.specialist && doctor.specialist.specialist.toLowerCase().includes(searchTerm)) ||
                    (doctor.user.name && doctor.user.name.toLowerCase().includes(searchTerm))
                );
            })
        );
    }, [search, doctorData]);


    function handleChange(e) {
        const key = e.target.id;
        const value = key === 'gambar' ? e.target.files[0] : e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsNotif(false); // Set notifikasi menjadi false di awal
        const url = isEdit ? `/doctor/update/${editDoctorId}` : "/doctor/store";

        const formData = new FormData();
        formData.append("nik", values.nik);
        formData.append("specialist_id", values.specialist_id);
        formData.append("user_id", values.user_id);
        if (values.gambar) {
            formData.append("gambar", values.gambar);
        }

        router.post(url, values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                setValues({
                    gambar: null,
                    nik: "",
                    specialist_id: "",
                    user_id: "",
                });
                fileInputRef.current.value = null;
                setIsEdit(false);
                setIsNotif(true); // Tampilkan notifikasi jika berhasil
                document.getElementById("my_modal_1").close();
            },
            onError: (errors) => {
                console.error("There was an error!", errors);
            },
        });
    }

    function handleEdit(doctor) {
        setValues({
            gambar: "",
            nik: doctor.nik,
            specialist_id: doctor.specialist_id,
            user_id: doctor.user_id,
        });
        setEditDoctorId(doctor.id);
        setIsEdit(true);
        document.getElementById("my_modal_1").showModal();
    }

    function handleAdd() {
        setValues({
            gambar: "",
            nik: "",
            specialist_id: "",
            user_id: "",
        });
        setIsEdit(false);
        document.getElementById("my_modal_1").showModal();
    }

    function handleDelete(doctorId) {
        if (confirm("Apakah Anda yakin ingin menghapus data dokter ini?")) {
            router.post(
                `/doctor/delete/${doctorId}`,
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
                            Data Dokter{" "}
                            <span className="block text-slate-700 font-normal">
                                Anda dapat menambahkan data dokter
                            </span>
                        </h1>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                            className="btn bg-purple-600 text-white font-bold text-sm px-5"
                            onClick={handleAdd}
                        >
                            Tambah
                        </button>
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
                    {props.doctorData.length > 0 ? (
                        <div className="overflow-x-auto mt-10">
                            <div className="w-full lg:flex justify-end">
                                <div className="mb-4 overflow-hidden rounded max-w-xs">
                                    <label className="input border-none outline-none flex items-center gap-2 max-w-xs">
                                        <input
                                            type="text"
                                            placeholder="Cari dokter..."
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
                                        <th className="py-3">Nama Dokter</th>
                                        <th className="py-3">NIK</th>
                                        <th className="py-3">Spesialis</th>
                                        <th className="py-3">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((doctor, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="flex items-center gap-2">{doctor.gambar && <img src={`/storage/${doctor.gambar}`} alt={doctor.user.name} className="w-10 h-10 object-cover rounded-full border shadow" />} {doctor.user.name}</td>
                                                <td>{doctor.nik}</td>
                                                <td>
                                                    
                                                {doctor.specialist ? doctor.specialist.specialist : ''}
                                                </td>
                                                <td className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(doctor)
                                                        }
                                                        className="btn btn-warning btn-sm px-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                doctor.id
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
                            Upss.. Maaf Data dokter masih kosong!
                        </p>
                    )}
                </div>

                {/* modal tambah dan edit data */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h1 className="text-sm font-bold text-black">
                            {isEdit ? "Edit Data Dokter" : "Tambah Dokter"}
                            {""}
                            <span className="block text-xs font-normal">
                                Silahkan isi form dibawah untuk{" "}
                                {isEdit ? "mengubah" : "menambahkan"} data
                                dokter
                            </span>
                        </h1>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                    setValues({
                                        gambar: "",
                                        nik: "",
                                        specialist_id: "",
                                        user_id: "",
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
                                id="gambar"
                                name="gambar"
                                onChange={handleChange}
                                type="file"
                                className="file-input file-input-bordered mt-3 file-input-warning w-full"
                                ref={fileInputRef}
                            />
                            {errors.gambar && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.gambar}
                                </div>
                            )}

                            <input
                                id="nik"
                                name="nik"
                                value={values.nik}
                                onChange={handleChange}
                                type="number"
                                placeholder="NIK"
                                className="input input-bordered placeholder:text-sm w-full"
                            />
                            {errors.nik && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.nik}
                                </div>
                            )}

                            <select
                                id="specialist_id"
                                name="specialist_id"
                                value={values.specialist_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">
                                    Pilih Bidang Spesialis
                                </option>
                                {props.specialists &&
                                props.specialists.length > 0 ? (
                                    props.specialists.map((specialist, i) => (
                                        <option value={specialist.id} key={i}>
                                            {specialist.specialist}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>
                                        Tidak ada bidang spesialis yang tersedia
                                    </option>
                                )}
                            </select>

                            {errors.specialist_id && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.specialist_id}
                                </div>
                            )}

                            <select
                                id="user_id"
                                name="user_id"
                                value={values.user_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">
                                    Pilih User
                                </option>
                                {props.users &&
                                props.users.length > 0 ? (
                                    props.users.map((user, i) => (
                                        <option value={user.id} key={i}>
                                            {user.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>
                                        Tidak ada pengguna yang tersedia
                                    </option>
                                )}
                            </select>

                            {errors.user_id && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.user_id}
                                </div>
                            )}

                            <button className="btn bg-purple-700 text-white hover:text-black text-sm font-bold px-10 w-max uppercase">
                                {isEdit ? "Save" : "Create"}
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>
        </AuthenticatedLayout>
    );
}
