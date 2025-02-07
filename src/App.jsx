import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useState } from 'react'
import './App.css'

//import Navbar from './components/Navbar';

import Beneficiaries from './components/Beneficiaries';
import AidDistribution from './components/AidDistribution';

function App() {
  const [token, setToken] = useState(localStorage.getItem('auth_token') || '');

    return (
      <div>
        {token && <Navbar setToken={setToken}/>}
      
      <Routes>
            {!token ? (
                <Route path="*" element={<Login setToken={setToken} />} />
            ) : (
                <>
                    <Route path="/" element={<Beneficiaries />} />
                    <Route path="/aid-distributions" element={<AidDistribution />} />
                </>
            )}
        </Routes>
        </div>
    );
}

export default App
