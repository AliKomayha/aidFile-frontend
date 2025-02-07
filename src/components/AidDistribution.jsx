import { useState, useEffect } from 'react';



function AidDistribution() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
    const [aidId, setAidId] = useState('');
    const [unitValue, setUnitValue] = useState('');
    const [amount, setAmount] = useState('');

    const token = localStorage.getItem('auth_token');
    
    const baseUrl = 'http://localhost:8001' ;

    useEffect(() => {
        fetch('http://localhost:8001/api/beneficiaries', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setBeneficiaries(data))
        .catch(error => console.error("Error fetching beneficiaries:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8001/api/aid-distributions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                aid_id: aidId,
                beneficiary_id: selectedBeneficiary,
                unit_value: unitValue,
                amount: amount
            })
        });

        if (response.ok) {
            alert("تم توزيع المساعدة!");
        } else {
            alert("خطأ أثناء التوزيع");
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

                <input type="number" value={aidId} onChange={(e) => setAidId(e.target.value)} placeholder="معرف المساعدة" required />
                <input type="number" value={unitValue} onChange={(e) => setUnitValue(e.target.value)} placeholder="قيمة الوحدة" required />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="الكمية" required />
                <button type="submit">توزيع المساعدة</button>
            </form>
        </div>
    );
}

export default AidDistribution;
