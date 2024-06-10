import { Link } from "@inertiajs/react";
import React from "react";

function Navbar({ user }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Dokterku</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Beranda</a>
                    </li>
                    <li>
                        <details>
                            <summary>Menu</summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                {!user ? (
                                    <>
                                        <li>
                                            <Link href={route("login")}>
                                                Masuk
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route("register")}>
                                                Daftar
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href={route("logout")}>
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
