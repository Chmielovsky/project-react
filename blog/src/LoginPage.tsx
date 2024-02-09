import React from 'react';
import LoginForm from './components/LoginForm';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const handleLoginSuccess = (isSuccess: boolean) => {
        if (isSuccess) {
            logIn();
            navigate('/blog');
        } else {
            alert("Logowanie nieudane");
        }
    };

    return <LoginForm onLogin={handleLoginSuccess} />;
};

export default LoginPage;