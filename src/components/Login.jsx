import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //const baseUrl = 'http://localhost:8001' ;
    

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
        const response = await fetch('http://192.168.1.121:8001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('auth_token', data.token);
            setToken(data.token);
            navigate('/');
        } else {
            alert("خطأ في تسجيل الدخول");
        }
    } catch (error) {
        setError("Error logging in:");
    }
};

    return (
        <div>
            <h2>تسجيل الدخول</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="اسم المستخدم" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="كلمة المرور" 
                    required 
                />
                <button type="submit">تسجيل الدخول</button>
            </form>
        </div>
    );
}

export default Login;
