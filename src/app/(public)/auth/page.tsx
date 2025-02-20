"use client";
import "./login.css";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {loginUser} from "@/app/service/api.service";
import {useAuth} from "@/app/context/AuthContext";

const LoginPage = () => {
    const {setIsAuthenticated, setUser} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(username, password);
            setIsAuthenticated(true);
            setUser({firstName: data.firstName, image: data.image});
            router.push("/");
        } catch (err) {
            setError("Login failed: " + (err instanceof Error ? err.message : "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h2>Authorization</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Login"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Log in"}
                </button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default LoginPage;