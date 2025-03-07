import { useState } from "react";
import { loginUser } from "../api/authAPI";
import AuthService from "../utils/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token } = await loginUser(username, password);
            AuthService.setToken(token);
            window.location.href = "/kanban";
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
