import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
function Beneficiary() {

    
    const { id } = useParams();
    const navigate = useNavigate();

    const [beneficiary, setBeneficiary] = useState(null);
    const [aidDistributions, setAidDistributions] = useState([]);
    const token = localStorage.getItem('auth_token');   
  
    
     useEffect(() => {
        fetch(`${baseUrl}/api/beneficiaries/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then((data) => {
            setBeneficiary(data);
            setAidDistributions(data.aid_distributions || []); 
        })
        .catch(error => console.error("Error fetching beneficiary:", error));
    }, [id]);

    if (!beneficiary) {
        return <p>جاري تحميل بيانات المستفيد...</p>;
    }

    return (
        <div>
            <h2>بيانات المستفيد</h2>
            <table border="1" style={{ width: '100%', textAlign: 'right' }}>
                <tbody>
                    <tr>
                        <th>الاسم الكامل</th>
                        <td>{beneficiary.name} {beneficiary.father_name} {beneficiary.lastname}</td>
                    </tr>
                    <tr>
                        <th>رقم الهاتف</th>
                        <td>{beneficiary.phone_number}</td>
                    </tr>
                    <tr>
                        <th>تاريخ الميلاد</th>
                        <td>{beneficiary.date_of_birth}</td>
                    </tr>
                    <tr>
                        <th>فصيلة الدم</th>
                        <td>{beneficiary.blood_type}</td>
                    </tr>
                </tbody>
            </table>
              {/* ✅ Button to Navigate to Update Page */}
              <button onClick={() => navigate(`/update-beneficiary/${id}`)}>✏️ تحديث البيانات</button>

               {/* ✅ Aid Distribution Table */}
                <h3>المساعدات المستلمة</h3>
                {aidDistributions.length > 0 ? (
                    <table border="1" style={{ width: "100%", textAlign: "right" }}>
                        <thead>
                            <tr>
                                <th>نوع المساعدة</th>
                                <th>تاريخ التوزيع</th>
                                <th>الكمية</th>
                                <th>القيمة الإجمالية</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aidDistributions.map((aid) => (
                                <tr key={aid.id}>
                                    <td>{aid.aid?.type || "غير متوفر"}</td>
                                    <td>{aid.date_given}</td>
                                    <td>{aid.amount}</td>
                                    <td>{aid.total_value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>❌ لم يتم تسجيل مساعدات لهذا المستفيد.</p>
                )}
        </div>
    );
}
export default Beneficiary;



