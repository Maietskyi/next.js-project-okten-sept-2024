"use client";
import "./MenuComponent.css"
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";

export const MenuComponent = () => {
    const {isAuthenticated, user, handleLogout} = useAuth();

    return (
        <nav>
            <Link href="/">
                <div className="logo">
                    {isAuthenticated ? (
                        <>
                            <li className="user-profile">
                                {user?.image && <img src={user.image} alt="User Logo" className="user-logo"/>}
                                <span>{user?.firstName || "User"}</span>
                            </li>
                        </>
                    ) : ''}
                </div>
            </Link>
            <ul>
                <li><Link href="/">Home</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link href="/users">Users</Link></li>
                        <li><Link href="/recipes">Recipes</Link></li>
                        <li>
                            <button className="button-get-out" onClick={handleLogout}>Exit</button>
                        </li>
                    </>
                ) : (
                    <li><Link className="button-login" href="/auth">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};