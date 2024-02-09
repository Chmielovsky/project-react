import React, { useState } from 'react';
import "./Style/LoginForm.css"
import 'bootstrap/dist/css/bootstrap.css';

interface LoginFormProps {
    onLogin: (isSuccess: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (username === "admin" && password === "admin") {
            localStorage.setItem('isLoggedIn', 'true'); // Zapisz stan logowania do Local Storage
            onLogin(true);
        } else {
            alert("Nieprawidłowe dane logowania");
            onLogin(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Login:</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button type="submit" className="btn btn-success btn-login">Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;