import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function User(props) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role_id: "",
    });

    const [isNotif, setIsNotif] = useState(false);
    const [search, setSearch] = useState("");
    const userData = props.userData;
    const [filteredData, setFilteredData] = useState(userData);

    const [isEdit, setIsEdit] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        setFilteredData(
            userData.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.role.role.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, userData]);

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
        const url = isEdit ? `/user/update/${editUserId}` : '/user/store';
        router.post(url, values, {
            onSuccess: () => {
                setValues({
                    name: "",
                    email: "",
                    password: "",
                    role_id: "",
                });
                setIsEdit(false);
                setIsNotif(true); // Tampilkan notifikasi jika berhasil
                document.getElementById('my_modal_1').close();
            },
            onError: (errors) => {
                console.error("There was an error!", errors);
            },
        });
    }

    function handleEdit(user){
        setValues({
            name: user.name,
            email: user.email,
            password: "",
            role_id: user.role_id,
        });
        setEditUserId(user.id);
        setIsEdit(true);
        document.getElementById('my_modal_1').showModal();
    }

    function handleAdd(){
        setValues({
            name: '',
            email: '',
            password: '',
            role_id: ''
        });
        setIsEdit(false);
        document.getElementById('my_modal_1').showModal();
    }

    function handleDelete(userId) {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            router.post(`/user/delete/${userId}`, {
                _method: 'delete',
            }, {
                onSuccess: () => {
                    setIsNotif(true);
                },
                onError: (errors) => {
                    console.error("There was an error!", errors);
                },
            });
        }
    }

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Data Pengguna" />

            <div className="py-12 relative w-full">
                <div className="w-full px-3 lg:px-8">
                    <div className="flex items-start justify-between mb-3">
                        <h1 className="text-sm font-bold text-black">
                            Data Pengguna{" "}
                            <span className="block text-slate-700 font-normal">
                                Anda dapat menambahkan data pengguna
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
                    {props.userData.length > 0 ? (
                        <div className="overflow-x-auto mt-10">
                            <div className="w-full lg:flex justify-end">
                            <div className="mb-4 overflow-hidden rounded max-w-xs">
                                <label className="input border-none outline-none flex items-center gap-2 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Cari pengguna..."
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
                                        <th className="py-3">Nama</th>
                                        <th className="py-3">Email</th>
                                        <th className="py-3">Role</th>
                                        <th className="py-3">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-center">{i + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role.role}</td>
                                                <td className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="btn btn-warning btn-sm px-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
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
                            Upss.. Maaf Data pengguna masih kosong!
                        </p>
                    )}
                </div>

                {/* modal tambah dan edit data */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h1 className="text-sm font-bold text-black">
                            {isEdit ? 'Edit Data Pengguna' : 'Tambah Pengguna'}{''}
                            <span className="block text-xs font-normal">
                                Silahkan isi form dibawah untuk {isEdit ? 'mengubah' : 'menambahkan'} data pengguna
                            </span>
                        </h1>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                             onClick={() => {
                                setValues({
                                    name: '',
                                    email: '',
                                    password: '',
                                    role_id: ''
                                });
                                setIsEdit(false);
                                document.getElementById('my_modal_1').close();
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
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Nama Lengkap"
                                className="input mt-3 input-bordered placeholder:text-sm w-full max-w-sm"
                            />
                            {errors.name && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.name}
                                </div>
                            )}

                            <input
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                                className="input input-bordered placeholder:text-sm w-full max-w-3xl"
                            />
                            {errors.email && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.email}
                                </div>
                            )}

                            <input
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                className="input input-bordered placeholder:text-sm w-full max-w-3xl"
                            />
                            {errors.password && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.password}
                                </div>
                            )}

                            <select
                                id="role_id"
                                name="role_id"
                                value={values.role_id}
                                onChange={handleChange}
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option disabled value="">
                                    Pilih Role
                                </option>
                                {props.roles && props.roles.length > 0 ? (
                                    props.roles.map((role, i) => (
                                        <option value={role.id} key={i}>
                                            {role.role}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>
                                        Tidak ada role yang tersedia
                                    </option>
                                )}
                            </select>

                            {errors.role_id && (
                                <div className="text-xs font-medium text-red-500">
                                    {errors.role_id}
                                </div>
                            )}

                            <button className="btn bg-purple-700 text-white hover:text-black text-sm font-bold px-10 w-max uppercase">
                                {isEdit ? 'Save' : 'Create'}
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>
        </AuthenticatedLayout>
    );
}
