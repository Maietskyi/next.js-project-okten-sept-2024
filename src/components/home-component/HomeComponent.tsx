'use client';
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import "./HomeComponent.css"

export default function HomeComponent() {
    const {isAuthenticated, user} = useAuth();

    return (
        <div className="home-page">
            <h1>Welcome to the world of cooking!</h1>
            {!isAuthenticated ? (
                <div className="auth-message">
                    <p><Link href="/auth">Login</Link> to view users and recipes.</p>
                </div>
            ) : (
                <div className="welcome-message">
                    {user?.image && <img src={user?.image} alt="User Logo" className="user-logo"/>}
                    <p>Welcome back, dear {user?.firstName ? user?.firstName : " user"}!</p>
                </div>
            )}
        </div>
    );
}