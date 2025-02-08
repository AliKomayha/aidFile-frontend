import { useState, useEffect } from 'react';
import { baseUrl } from "../config";



function AidDistribution() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [aids, setAids] = useState([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
    const [selectedAid, setSelectedAid] = useState('');
    const [unitValue, setUnitValue] = useState('');
    const [amount, setAmount] = useState('');

    const token = localStorage.getItem('auth_token');
    
   

    useEffect(() => {
        fetch(`${baseUrl}/api/beneficiaries`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setBeneficiaries(data))
        .catch(error => console.error("Error fetching beneficiaries:", error));
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/api/aids`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setAids(data))
        .catch(error => console.error("Error fetching aids:", error));
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = new Date().toISOString().split('T')[0];
        
        const response = await fetch(`${baseUrl}/api/aid-distributions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Aid_ID: selectedAid,
                Beneficiary_ID: selectedBeneficiary,
                date_given: formattedDate,
                unit_value: unitValue,
                amount: amount
            })
        });

        if (response.ok) {
            alert("تم توزيع المساعدة!");
        } else {
            alert("خطأ أثناء التوزيع" );
        }
    };

    return (
        <div>
            <h2>توزيع المساعدة</h2>
            <form onSubmit={handleSubmit}>
                

                <select value={selectedBeneficiary} onChange={(e) => setSelectedBeneficiary(e.target.value)} required>
                    <option value="">اختر المستفيد</option>
                    {beneficiaries.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>

                <select value={selectedAid} onChange={(e) => setSelectedAid(e.target.value)} required>
                    <option value=""> نوع المساعدة </option>
                    {aids.map((b) => (
                        <option key={b.id} value={b.id}>{b.type}</option>
                    ))}
                </select>

                <input type="number" value={unitValue} onChange={(e) => setUnitValue(e.target.value)} placeholder="قيمة الوحدة" required />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="الكمية" required />
                <button type="submit">توزيع المساعدة</button>
            </form>
        </div>
    );
}

export default AidDistribution;
