import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useState } from 'react'
import './App.css'

//import Navbar from './components/Navbar';

import Beneficiaries from './components/Beneficiaries';
import Beneficiary from './components/Beneficiary';
import AidDistribution from './components/AidDistribution';
import NewBeneficiary from './components/NewBeneficiary';
import UpdateBeneficiary from './components/UpdateBeneficiary';
import Test from './components/test';
import Stats from './components/Stats';

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
                    <Route path="/beneficiaries" element={<Beneficiaries />} />
                    <Route path="/aid-distributions" element={<AidDistribution />} />
                    <Route path="/new-beneficiary" element={<NewBeneficiary />} />
                    <Route path="/beneficiary/:id" element={<Beneficiary />} />
                    <Route path="/update-beneficiary/:id" element={<UpdateBeneficiary />} />
                    <Route path="/test" element={<Test />}/>
                    <Route path="/stats" element={<Stats />}/>
                </>
            )}
        </Routes>
        </div>
    );
}

export default App
