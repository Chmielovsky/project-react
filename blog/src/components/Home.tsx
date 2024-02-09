import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn !== 'true') {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="container">
            <h1>Witaj na naszej stronie</h1>
            <h4>Adrian Bugaj </h4>
            <h4>Tomasz Chmielarczyk</h4>
        </div>
    );
};

export default Home;