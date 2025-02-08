import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

function Beneficiaries() {
    
    const navigate = useNavigate();

    const [beneficiaries, setBeneficiaries] = useState([]);
    const token = localStorage.getItem('auth_token');

    useEffect(() => {
        fetch( `${baseUrl}/api/beneficiaries`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setBeneficiaries(data))
        .catch(error => console.error("Error fetching beneficiaries:", error));
    }, []);
    
    const viewBeneficiary = (id) => {
        navigate(`/beneficiary/${id}`);
    };

    return (
        <div>
            <h2>المستفيدون</h2>
            <input type="text" id="nameSerch"></input>

            <ul>
                {beneficiaries.map((b) => (
                    <li key={b.id}>{b.name} {b.father_name} {b.lastname} -{b.phone_number}
                    <button onClick={() => viewBeneficiary(b.id)}>
                    عرض
                  </button></li>
                ))}
            </ul>
        </div>
    );
}

export default Beneficiaries;
