"use client";
import "./auth-component.css";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {authLoginUser} from "@/service/api.service";
import {useAuth} from "@/context/AuthContext";

const AuthComponent = () => {
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
            const data = await authLoginUser(username, password);
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
            <form onSubmit={handleLogin}>
                <h2>Authorization</h2>
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
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default AuthComponent;