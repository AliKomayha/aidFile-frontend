import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../config";
function Beneficiary() {

    // const baseUrl = 'http://192.168.1.121:8001' ;
    const { id } = useParams();

    const [beneficiary, setBeneficiary] = useState([]);
    const token = localStorage.getItem('auth_token');
  

     useEffect(() => {
        fetch(`${baseUrl}/api/beneficiaries/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setBeneficiary(data))
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
        </div>
    );
}
export default Beneficiary;



