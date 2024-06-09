import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Dashboard(props) {
    
    console.log('props : ', props)
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-3 lg:px-8">
                    <h1 className="text-sm font-bold text-black">
                        Edit{" "}
                        <span className="block text-slate-700 font-normal">
                            You can create a new project by fill the form below
                        </span>
                    </h1>


                    <form
                        // onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-2"
                    >
                        <input
                            id="title"
                            value={props.myNews.title}
                            // onChange={handleChange}
                            type="text"
                            placeholder="Title"
                            className="input mt-3 input-bordered placeholder:text-sm w-full max-w-sm"
                        />
                        {/* {errors.title && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.title}
                            </div>
                        )} */}

                        <input
                            id="category"
                            value={props.myNews.category}
                            // onChange={handleChange}
                            type="text"
                            placeholder="Category"
                            className="input input-bordered placeholder:text-sm w-full max-w-3xl"
                        />
                        {/* {errors.category && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.category}
                            </div>
                        )} */}

                        <textarea
                            id="text"
                            value={props.myNews.text}
                            // onChange={handleChange}
                            placeholder="Description"
                            className="textarea textarea-bordered placeholder:text-sm text-base w-full max-w-full"
                        ></textarea>
                        {/* {errors.text && (
                            <div className="text-xs font-medium text-red-500">
                                {errors.text}
                            </div>
                        )} */}

                        <button className="btn bg-purple-700 text-white hover:text-black text-sm font-bold px-10 w-max uppercase">
                            Save
                        </button>
                    </form>
                    

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
